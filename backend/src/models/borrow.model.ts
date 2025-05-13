import { db } from "../index.ts";

export const createBorrow = async (userId: number, bookInstanceId: number) => {
    return db.borrowed.create({
        data: {
            UserId: userId,
            BookInstanceId: bookInstanceId,
            IsReturned: false
        }
    })
}

export const isBookFullyBorrowed = async (bookId: number) => {
    const allInstances = await db.bookInstances.findMany({
        where: {
            BookId: bookId
        },
        select: {
            BookInstanceId: true
        }
    })

    const borrowedInstances = await db.borrowed.findMany({
        where: {
            BookInstanceId: {
                in: allInstances.map(b => b.BookInstanceId)
            },
            IsReturned: false
        },
        select: {
            BookInstanceId: true
        }
    })

    return allInstances.length - borrowedInstances.length <= 0
}

export const getAvailableInstance = async (bookId: number) => {
    const instances = await db.bookInstances.findMany({
        where: {
            BookId: bookId
        },
        include: {
            Borrowed: true
        }
    })

    return instances.find(instance =>
        !instance.Borrowed.some(b => !b.IsReturned)
    )
}

export const autoReturn = async () => {
    const fiveDays = new Date()
    fiveDays.setDate(fiveDays.getDate() - 5)

    const result = await db.borrowed.updateMany({
        where: {
            IsReturned: false,
            Created_At: {
                lt: fiveDays
            }
        },
        data: {
            IsReturned: true
        }
    })

    return result
}

export const getBorrowedById = async(borrowedId: number) => {
    const borrow = db.borrowed.findUnique({
        where: {
            BorrowedId: borrowedId,
        },
    });
    return borrow;
}

export const deleteBorrowedById = async(borrowedId: number) => {
    const borrow = db.borrowed.delete({
        where: {
            BorrowedId: borrowedId
        },
    });
    return borrow;
}
  