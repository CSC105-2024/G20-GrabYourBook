import { Hono } from 'hono'
import * as borrowController from '../controller/borrow.controller.ts'

export const borrowRouter = new Hono();

borrowRouter.post("/booked", borrowController.createBorrowed);
borrowRouter.post("/return", borrowController.autoReturnBook);
borrowRouter.get("/getborrowed", borrowController.getBorrowedById);
borrowRouter.delete("/delete", borrowController.deleteBorrowedById);