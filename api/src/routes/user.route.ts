import express from 'express';

import * as userController from '../controllers/user.controller';
import { validateIsAdmin } from '../middlewares/custom.middleware';

export const userRouter = express.Router();

userRouter.get('/', validateIsAdmin, userController.get);

userRouter.get('/me', userController.getCurrent);
