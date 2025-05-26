import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import * as jwt from 'hono/jwt';

export const AuthMiddleware = async (c: Context, next: Next) => {
    try {
        const authCookie = getCookie(c, "authToken");

        if (!authCookie) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "User Credential Not Found"
                },
                401
            )
        }

        const SECRET = process.env.JWT_SECRET;

        if (!SECRET) {
            throw new Error("Miising JWT_SECRET in ,env file");
        }

        try {
            const { id } = await jwt.verify(authCookie, SECRET);

            c.set("userId", id);

            return next();
        } catch (jwtError) {
            return c.json(
                {
                    success: false,
                    data: null,
                    msg: "Invalid User Creadential"
                },
                401
            )
        }
    } catch (e) {
        console.log(e);

        return c.json(
            {
                success: false,
                data: `Internal Server Error`,
                msg: e,
            },
            500
        )
    }
}