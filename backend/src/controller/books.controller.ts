import type { Context } from "hono";
import * as booksModel from "../models/books.model.ts";
import { db } from "../index.ts";

export const getDetail = async (c: Context) => {
  const param = c.req.query("id");
  try {
    if (!param) {
      return c.json({
        success: false,
        data: null,
        msg: "Missing require fields",
      });
    }

    return c.json(
      {
        success: true,
        data: await booksModel.getDetailBook(parseInt(param)),
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: `${e}`,
        msg: "Missing require fields",
      },
      500
    );
  }
};

export const getNextAvailableDate = async (c: Context) => {
  try {
    const bookId = Number(c.req.query("bookId"));
    if (!bookId) {
      return c.json({ success: false, msg: "Missing bookId" }, 400);
    }

    const date = await booksModel.getNextAvailableDate(bookId);
    return c.json({
      success: true,
      bookId,
      nextAvailableDate: date,
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: `${e}`,
        msg: "Missing require fields",
      },
      500
    );
  }
};

export const getAllDetailBook = async (c: Context) => {
  try {
    const data = await db.books.findMany();
    return c.json(
      {
        success: true,
        data: data,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: `${e}`,
        msg: "Missing required fields",
      },
      500
    );
  }
};

export const getBookByName = async(c: Context) => {
    try {
        const query = c.req.query("name");

        if(!query || query.trim() === "") {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing name of Book",
                },
                400
            );
        }

        const data = await booksModel.getBookByName(query);
        return c.json(
            {
                success: true,
                data: data,
            },
            200
        );
    } catch(e) {
        return c.json(
            {
                success: false,
                data: e,
                msg: "Internal Server Error"
            },
            500
        );
    }
};
export const getBookById = async (c: Context) => {
  const id = Number(c.req.param("id"));

  try {
    const book = await db.books.findUnique({
      where: { BookId: id },
      include: {
        BookInstance: {
          include: { Borrowed: true },
        },
        BookCategory: {
          include: { Category: true },
        },
      },
    });

    if (!book) {
      return c.json({ success: false, msg: "Book not found" }, 404);
    }

    const totalCopies = book.BookInstance.length;
    const borrowedCount = book.BookInstance.filter((instance) =>
      instance.Borrowed.some((b) => !b.IsReturned)
    ).length;

    const remainingCopies = totalCopies - borrowedCount;

    return c.json({
      success: true,
      data: {
        BookId: book.BookId,
        Title: book.Title,
        Author: book.Author,
        Description: book.Description,
        CoverUrl: book.CoverUrl,
        Category: book.BookCategory.map((bc) => bc.Category.Name).join(", "),
        remainingCopies,
      },
    });
  } catch (e) {
    return c.json(
      { success: false, msg: "Internal Server Error", data: `${e}` },
      500
    );
  }
};
