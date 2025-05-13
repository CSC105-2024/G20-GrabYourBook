import { Hono } from "hono";
import { booksRoutes } from "./books.routes.ts";

export const mainRouter = new Hono();

mainRouter.route("/book", booksRoutes);
