import type { Context } from "hono";
import * as userModel from '../models/user.model.ts';
import * as bcrypt from 'bcrypt';
import * as jwt from 'hono/jwt';
import { setCookie } from "hono/cookie";

type RegisterPayload = {
    username: string;
    password: string;
}

type LoginPayload = {
    username: string;
    password: string;
}

export const Register = async (c: Context) => {
    try {
        const body = await c.req.json<RegisterPayload>();
        if (!body.password || !body.username) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing required fields",
                },
                400
            )
        }

        const userIsDuplicate = await userModel.getUserByUsername(body.username);

        if (userIsDuplicate) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Username is already taken."
                },
                400
            )
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await userModel.createUser(body.username, hashedPassword);
        return c.json({
            success: true,
            data: { id: newUser.UserId },
            msg: "Register successful!!!!"
        },
            400)
    } catch (e) {
        return c.json(
            {
                success: false,
                data: e,
                msg: `Internal Server Error`,
            },
            500
        )
    }
};

export const Login = async (c: Context) => {
    try {
        const body = await c.req.json<LoginPayload>();

        if (!body.username || !body.password) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Missing required fields",
                },
                400
            )
        }

        const user = await userModel.getUserByUsername(body.username);

        if (!user) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Username not found",
                },
                400
            )
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.Password);

        if (!isPasswordMatch) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Password do not match.",
                },
                400
            )
        }

        const jwtPayload = {
            id: user.UserId
        }

        const SECRET = process.env.JWT_SECRET;

        if (!SECRET) {
            throw new Error("Missing JWT_SECRET in .env file");
        }

        const token = await jwt.sign(jwtPayload, SECRET);

        setCookie(c, "authToken", token);

        return c.json(
            {
                success: true,
                msg: "Login Successful!"
            },
            200
        )
    } catch (e) {
        console.log(e);
        
        return c.json(
            {
                success: false,
                data: e,
                msg: `Internal Server Error`,
            },
            500
        )
    }
}