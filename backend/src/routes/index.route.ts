import { Hono } from "hono";
import { booksRoutes } from "./books.routes.ts";
import { userRouter } from "./user.route.ts";
import { borrowRouter } from "./borrow.route.ts";
import { AuthRouter } from "./auth.routes.ts";

export const mainRouter = new Hono();

mainRouter.route("/auth", AuthRouter)
mainRouter.route("/user", userRouter);
mainRouter.route("/book", booksRoutes);
mainRouter.route("/borrow", borrowRouter);