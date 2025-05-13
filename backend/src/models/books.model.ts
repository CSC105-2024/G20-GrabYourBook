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

  return {
    BookId: book.BookId,
    Title: book.Title,
    Author: book.Author,
    Description: book.Description,
    totalCopies,
    availableCopies,
    categories,
  };
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
