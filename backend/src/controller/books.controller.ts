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