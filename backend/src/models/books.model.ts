// import { Hono } from "hono";
// import { db } from "../index.ts";

// export const getDetailBook = async (id: number) => {
//   const books = await db.books.findUnique({
//     where: {
//       BookId: id,
//     },
//   });

//   return books;
// };

// export const getAllDetailBook = async () => {
//   const data = await db.books.findMany();
//   return data;
// };

import { db } from "../index.ts";

export const getDetailBook = async (id: number) => {
  const book = await db.books.findUnique({
    where: {
      BookId: id,
    },
  });

  return book;
};

export const getAllDetailBook = async () => {
  const books = await db.books.findMany();
  return books;
};
