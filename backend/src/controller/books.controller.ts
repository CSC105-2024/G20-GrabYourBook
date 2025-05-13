import type { Context } from "hono";
import * as booksModel from '../models/books.model.ts'

export const getAllbookDetails = async(c: Context) => {
    try {
        const data = await booksModel.getBooks();
        return c.json(
            {
                success: true,
                data: data,
            },
            200
        )
    } catch(e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            },
            500
        )
    }
}

export const getbookDetailsById = async(c: Context) => {
    try {
        const param = c.req.query("id");
        if(!param) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing require fields"
                }
            )
        }
        const data = await booksModel.getBooksById(parseInt(param));
        return c.json(data, 200);
    } catch(e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            },
            500
        )
    }
}