import { db } from "../index.ts";

export const getDetailBook = async (id: number) => {
  const book = await db.books.findUnique({
    where: {
      BookId: id,
    },
    include: {
      BookInstance: {
        include: {
          Borrowed: true,
        },
      },
      BookCategory: {
        include: {
          Category: true,
        },
      },
    },
  });

  if (!book) return null;
  const totalCopies = book.BookInstance.length;
  const availableCopies = book.BookInstance.filter((instance) =>
    instance.Borrowed.every((b) => b.IsReturned == true)
  ).length;
  const categories = book.BookCategory.map((bc) => bc.Category.Name);
  const nextAvailableDate = await getNextAvailableDate(id);

  return {
    BookId: book.BookId,
    Title: book.Title,
    Author: book.Author,
    Description: book.Description,
    totalCopies,
    availableCopies,
    categories,
    nextAvailableDate,
    coverUrl: book.CoverUrl,
  };
};

export const getNextAvailableDate = async (bookId: number) => {
  const instances = await db.bookInstances.findMany({
    where: { BookId: bookId },
    select: { BookInstanceId: true },
  });

  const instanceIds = instances.map((i) => i.BookInstanceId);

  if (instanceIds.length === 0) return null;

  const borrowed = await db.borrowed.findMany({
    where: {
      IsReturned: false,
      BookInstanceId: {
        in: instanceIds,
      },
    },
    select: {
      Created_At: true,
    },
  });

  if (borrowed.length === 0) return null;

  const dueDates = borrowed.map((b) => {
    const due = new Date(b.Created_At);
    due.setDate(due.getDate() + 5);
    return due;
  });

  const soonest = dueDates.sort((a, b) => a.getTime() - b.getTime())[0];
  const day = soonest.getDate().toString().padStart(2, "0");
  const month = (soonest.getMonth() + 1).toString().padStart(2, "0");
  const year = soonest.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getAllDetailBook = async () => {
  const books = await db.books.findMany();
  return books;
};

export const deleteBookById = async (id: number) => {
  const bookDetailsById = await db.books.delete({
    where: {
      BookId: id,
    },
  });
  return bookDetailsById;
};

export const getBookByName = async (name: string) => {
  const getBookByName = await db.books.findMany({
    where: {
      OR: [
        {
          Title: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          BookCategory: {
            some: {
              Category: {
                Name: {
                  contains: name,
                  mode: "insensitive",
                },
              },
            },
          },
        },
      ],
    },
    select: {
      BookId: true,
      Title: true,
      Author: true,
      CoverUrl: true,
    },
  });

  return getBookByName;
};
