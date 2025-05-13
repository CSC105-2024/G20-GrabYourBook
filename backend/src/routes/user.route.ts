import { Hono } from 'hono'
import * as userController from '../controller/user.controller.ts'

export const userRouter = new Hono();

userRouter.post('/register', userController.createUser);
userRouter.get('/getuser', userController.getUserById);