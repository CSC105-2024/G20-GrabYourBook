import * as booksController from '../controller/books.controller.ts'
import { Hono } from 'hono';

export const booksRoutes = new Hono();

booksRoutes.get("/getdetailbook", booksController.getDetail);
booksRoutes.get("/detailBook", booksController.getAllDetailBook);
booksRoutes.get("/availableDate", booksController.getNextAvailableDate);