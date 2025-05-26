import { Hono } from 'hono'
import * as borrowController from '../controller/borrow.controller.ts'
import { AuthMiddleware } from '../middlewares/auth.middleware.ts'

export const borrowRouter = new Hono();

borrowRouter.post("/borrow", AuthMiddleware, borrowController.createBorrowed);
borrowRouter.delete("/delete", AuthMiddleware, borrowController.deleteBorrowedById);
borrowRouter.get("/borrow", AuthMiddleware, borrowController.getBorrowedById);
borrowRouter.get("/borrow/auto-return", borrowController.autoReturnBook);
borrowRouter.get("/isAvailable", borrowController.checkAvailability);
borrowRouter.get("/mybook", AuthMiddleware, borrowController.getBorrowedByUserId);


