import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/index.js";
import { mainRouter } from "./routes/index.route.ts";
import cron from "node-cron";
import { autoReturn } from "./models/borrow.model.ts";
import { cors } from "hono/cors";

const app = new Hono();

export const db = new PrismaClient();

app.use("*", cors({ origin: ["http://localhost:5173"] }));

db.$connect().catch((e) => {
  throw new Error(`Database Connection Error ${e}`);
});

app.use(
	cors({
		origin: ['http://localhost:5173'],
	})
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("", mainRouter);

cron.schedule("0 0 * * *", async () => {
  const result = await autoReturn();
  console.log(
    `[CRON] Auto-returned ${
      result.count
    } book(s) at ${new Date().toISOString()}`
  );
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
