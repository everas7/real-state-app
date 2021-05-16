import express from 'express';
import { validate } from 'express-validation';

import * as userController from '../controllers/user.controller';
import { validateIsAdmin } from '../middlewares/custom.middleware';
import * as userValidator from '../validators/user.validator';
import { catchAsync } from '../helpers/catchAsync';
import { validateUserExists } from '../middlewares/user.middleware.ts';

export const userRouter = express.Router();

userRouter.get(
  '/',
  validateIsAdmin,
  validate(userValidator.get),
  catchAsync(userController.get)
);

userRouter.get('/me', catchAsync(userController.getCurrent));

userRouter.get('/:id', validateIsAdmin, catchAsync(userController.getById));

userRouter.post(
  '/',
  validateIsAdmin,
  validate(userValidator.create),
  catchAsync(userController.add)
);

userRouter.patch(
  '/:id',
  validateIsAdmin,
  validate(userValidator.patch),
  catchAsync(userController.update)
);

userRouter.delete(
  '/:id',
  validateIsAdmin,
  validateUserExists,
  catchAsync(userController.remove)
);
