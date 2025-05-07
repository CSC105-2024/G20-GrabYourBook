import { Hono } from "hono";
import { booksRoutes } from "./books.route.ts";

export const mainRouter = new Hono();

mainRouter.route("/book", booksRoutes);

