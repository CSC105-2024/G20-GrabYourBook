import { db } from "../index.ts";

export const createBorrow = async (userId: number, bookInstanceId: number, createdAt: Date) => {
    return db.borrowed.create({
        data: {
            UserId: userId,
            BookInstanceId: bookInstanceId,
            IsReturned: false,
            Created_At: createdAt,
        },
    });
};

export const isBookFullyBorrowedOnDate = async (bookId: number, date: Date) => {
    const allInstances = await db.bookInstances.findMany({
        where: {
            BookId: bookId
        }, select: {
            BookInstanceId: true
        },
    });

    const instanceIds = allInstances.map((i) => i.BookInstanceId);

    const borrowedOnDate = await db.borrowed.findMany({
        where: {
            BookInstanceId: {
                in: instanceIds
            }, IsReturned: false,
            Created_At: date,
        },
    });

    return borrowedOnDate.length >= allInstances.length;
};

export const getAvailableInstanceOnDate = async (bookId: number, date: Date) => {
    const instances = await db.bookInstances.findMany({
        where: {
            BookId: bookId
        }, include: {
            Borrowed: true
        },
    });

    return instances.find((instance) =>
        !instance.Borrowed.some(
            (b) => !b.IsReturned && sameDay(b.Created_At, date)
        )
    );
};

export const autoReturn = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const result = await db.borrowed.updateMany({
        where: {
            IsReturned: false,
            Created_At: {
                lte: fiveDaysAgo,
            },
        },
        data: {
            IsReturned: true,
        },
    });

    return result;
};

const sameDay = (a: Date, b: Date) => {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
};

export const getBorrowedById = async (borrowedId: number) => {
    return db.borrowed.findUnique({
        where: {
            BorrowedId: borrowedId
        },
    });
};

export const deleteBorrowedById = async (borrowedId: number) => {
    return db.borrowed.delete({
        where: {
            BorrowedId: borrowedId
        },
    });
};

export const getBorrowedByUserId = async (userId: number) => {
    const borrowed = await db.borrowed.findMany({
      where: {
        UserId: userId,
      },
      include: {
        BookInstance: {
          include: {
            Book: {
              select: {
                Title: true,
                Author: true,
                CoverUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        Created_At: "desc",
      },
    });
  
    return borrowed.map((entry) => {
      const due = new Date(entry.Created_At);
      due.setDate(due.getDate() + 5);

      const formatDate = (d: Date) => {
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };
  
      return {
        BorrowedId: entry.BorrowedId,
        BookInstanceId: entry.BookInstanceId,
        Title: entry.BookInstance.Book.Title,
        Author: entry.BookInstance.Book.Author,
        CoverUrl: entry.BookInstance.Book.CoverUrl,
        IsReturned: entry.IsReturned,
        Created_At: entry.Created_At,
        DueDate: formatDate(due),
      };
    });
  };
