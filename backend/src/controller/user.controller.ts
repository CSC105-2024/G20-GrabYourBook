import type { Context } from "hono"
import * as userModel from "../models/user.model.ts"

type creatUserBody = {
    username: string;
    password: string;
}

export const createUser = async (c: Context) => {
    try {
        const body = await c.req.json<creatUserBody>();
        if (!body.username || !body.password)
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing required fields"
                },
                400
            );

        if (await userModel.isDuplicate(body.username, body.password)) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Username or Password was already exist!!!"
                }
            );
        }

        const newUser = await userModel.createUser(
            body.username,
            body.password
        );
        return c.json(
            {
                success: true,
                data: newUser,
                msg: "Created new user successfull"
            },
            200
        );

    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`
            },
            500
        );
    }
};

export const getUserById = async (c: Context) => {
    try {
        const param = c.req.query("id");
        if (param !== undefined && param !== null) {
            const data = await userModel.getUserById(parseInt(param));
            return c.json(data, 200);
        }
        return c.json(
            {
                success: false,
                data: null,
                msg: "Missing requires fields"
            }
        )
    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`
            },
            500
        );
    }
}