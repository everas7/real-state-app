import express from 'express';
import { validate } from 'express-validation';

import * as userController from '../controllers/user.controller';
import { validateIsAdmin } from '../middlewares/custom.middleware';
import * as userValidator from '../validators/user.validator';

export const userRouter = express.Router();

userRouter.get(
  '/',
  validateIsAdmin,
  validate(userValidator.get),
  userController.get
);

userRouter.get('/me', userController.getCurrent);
