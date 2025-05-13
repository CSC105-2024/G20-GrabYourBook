import { Hono } from "hono";
import { booksRoutes } from "./books.route.ts";
import { userRouter } from "./user.route.ts";
import { borrowRouter } from "./borrow.route.ts";

export const mainRouter = new Hono();

mainRouter.route("/book", booksRoutes);
mainRouter.route("/user", userRouter);
mainRouter.route("/borrow", borrowRouter);