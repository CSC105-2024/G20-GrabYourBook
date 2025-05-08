import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/index.js";
import { booksRoutes } from './routes/books.routes.ts';

const app = new Hono();

export const db = new PrismaClient();

db.$connect().catch((e) => {
  throw new Error(`Database Connection Error ${e}`);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route('/books', booksRoutes)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
