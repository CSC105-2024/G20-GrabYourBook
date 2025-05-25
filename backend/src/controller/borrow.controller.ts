import type { Context } from 'hono';
import * as borrowedModel from '../models/borrow.model.ts';

type BorrowBody = {
    bookId: number;
    reserveDate: string;
};

export const createBorrowed = async (c: Context) => {
    try {
        const userId = c.get("userId");
        const { bookId, reserveDate } = await c.req.json<BorrowBody>();

        if (!bookId || !reserveDate) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing required fields"
                },
                400
            )
        }

        const reserve = new Date(reserveDate);
        reserve.setHours(0, 0, 0, 0);

        const isFull = await borrowedModel.isBookFullyBorrowedOnDate(bookId, reserve);

        if (isFull) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Unavailable on that day"
                },
                400
            )
        }

        const instance = await borrowedModel.getAvailableInstanceOnDate(bookId, reserve);

        if (!instance) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "No instance available"
                },
                400
            )
        }

        const record = await borrowedModel.createBorrow(userId, instance.BookInstanceId, reserve);

        const dueDate = new Date(reserve);
        dueDate.setDate(dueDate.getDate() + 5);

        return c.json({
            success: true,
            data: {
                ...record,
                BookInstanceId: instance.BookInstanceId,
                ReserveDate: reserve,
                DueDate: dueDate,
            },
            msg: "Reservation created successfully",
        }, 200);

    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            },
            500
        )
    }
};

export const autoReturnBook = async (c: Context) => {
    try {
        const result = await borrowedModel.autoReturn();

        return c.json({
            success: true,
            data: result.count,
            msg: `Auto-returned ${result.count} book(s).`,
        },
            200
        );

    } catch (e) {

        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            }
        )
    }
};

export const checkAvailability = async (c: Context) => {
    try {
        const bookId = Number(c.req.query("bookId"));
        const dateStr = c.req.query("date");

        if (!bookId || !dateStr) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing book Id or Date"
                },
                400
            )
        }

        const date = new Date(dateStr);
        date.setHours(0, 0, 0, 0);

        const isFull = await borrowedModel.isBookFullyBorrowedOnDate(bookId, date);

        return c.json({
            success: true,
            available: !isFull,
            status: isFull ? "Unavailable" : "Available",
        },
            200
        );

    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            }
        )
    }
};

export const deleteBorrowedById = async (c: Context) => {
    try {
        const userId = c.get("userId");
        const idStr = c.req.query("id");

        if (!idStr) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing Borrowed Id"
                },
                400
            )
        }

        const borrowedId = parseInt(idStr);
        const borrow = await borrowedModel.getBorrowedById(borrowedId);

        if (!borrow) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Reservation not found"
                },
                404
            );
        }

        if (borrow.UserId !== userId) {
            return c.json({
                success: false,
                data: null,
                msg: "You are not authorized to delete this reservation"
            },
                403
            );
        }

        await borrowedModel.deleteBorrowedById(borrowedId);

        return c.json({
            success: true,
            msg: "Deleted successfully"
        },
            200
        );
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `${e}`
        },
            500
        );
    }
};

export const getBorrowedById = async (c: Context) => {
    try {
        const id = c.req.query("id");
        if (!id) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing ID"
                },
                400
            );
        }

        const data = await borrowedModel.getBorrowedById(parseInt(id));
        return c.json({
            success: true,
            data: data,
        },
            200
        );
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: `${e}`
        },
            500
        );
    }
};

export const getBorrowedByUserId = async(c: Context) => {
    try{
        const user = c.get("user");
        const userId = user.id as number;

        if(!userId) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing reqiured fields",
                },
                400
            )
        }

        const data = await borrowedModel.getBorrowedByUserId(userId);
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
                data: e,
                msg: "Internal Sever Error",
            },
            500
        )
    }
}