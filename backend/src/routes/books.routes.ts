import * as booksController from '../controller/books.controller.ts'
import { Hono } from 'hono';

export const booksRoutes = new Hono();

booksRoutes.get("/getdetailbook", booksController.getDetail);
booksRoutes.get("/detailBook", booksController.getAllDetailBook);
booksRoutes.get("/availableDate", booksController.getNextAvailableDate);
booksRoutes.get("/search", booksController.getBookByName);
booksRoutes.get("/:id", booksController.getBookById);
booksRoutes.get("/remaining/:id", booksController.getDetail);
