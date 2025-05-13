import type { Context } from 'hono'
import * as borrowedModel from '../models/borrow.model.ts'

type BorrowBody = {
    userId: number
    bookId: number
}

export const createBorrowed = async (c: Context) => {
    try {
        const body = await c.req.json<BorrowBody>()

        if (!body.userId || !body.bookId) {
            return c.json(
                {
                    success: false,
                    bodo: null,
                    msg: 'Missing required fields'
                },
                400
            )
        }

        const isFullyBorrowed = await borrowedModel.isBookFullyBorrowed(body.bookId)
        if (isFullyBorrowed) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: 'No available copies for this book'
                },
                400
            )
        }

        const availableInstance = await borrowedModel.getAvailableInstance(body.bookId)
        if (!availableInstance) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: 'No available instance found'
                },
                400
            )
        }

        const record = await borrowedModel.createBorrow(body.userId, availableInstance.BookInstanceId)
        const dueDate = new Date(record.Created_At)
        dueDate.setDate(dueDate.getDate() + 5)
        return c.json({
            success: true,
            data: {
                ...record,
                BookInstanceId: availableInstance.BookInstanceId,
                DueDate: dueDate
            },
            msg: 'Borrowed successfully',
        },
            200
        )

    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`
            },
            500
        )
    }
}

export const autoReturnBook = async (c: Context) => {
    try {
        const result = await borrowedModel.autoReturn();
        return c.json({
            success: true,
            data: result.count,
            msg: `Auto-returned ${result.count} book(s) that passed 5 days.`
        })
    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`
            },
            500
        )
    }
}


export const getBorrowedById = async (c: Context) => {
    try {
        const param = c.req.query("id");
        if (!param) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing required fields"
                },
                400
            )
        }
        const data = await borrowedModel.getBorrowedById(parseInt(param));
        return c.json(
            {
                success: true,
                data: data,
            },
            200
        )
    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            },
            500
        );
    }
}

export const deleteBorrowedById = async (c: Context) => {
    try {
        const param = c.req.query("id");
        if (!param) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing required fields"
                },
                400
            )
        }

        const data = await borrowedModel.deleteBorrowedById(parseInt(param));
        return c.json(
            {
                success: true,
                data: data,
                msg: "Delete Successful!!!"
            },
            200
        )
    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            },
            500
        );
    }
}