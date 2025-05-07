import { Hono } from "hono";
import * as booksController from '../controller/books.controller.ts'

export const booksRoutes = new Hono();

booksRoutes.get("/detail", booksController.getAllbookDetails);
booksRoutes.get("/detailbyid", booksController.getbookDetailsById);