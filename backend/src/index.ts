import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/index.js";
import { mainRouter } from "./routes/index.route.ts";

const app = new Hono();

export const db = new PrismaClient();

db.$connect().catch((e) => {
  throw new Error(`Database Connection Error ${e}`);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("", mainRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
