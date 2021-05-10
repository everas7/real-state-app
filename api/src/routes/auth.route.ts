import express from 'express';
import { validate } from 'express-validation';
import passport from 'passport';

import * as authController from '../controllers/auth.controller';
import * as authValidator from '../validators/auth.validator';
import { validateSameEmailDoesntExist } from '../middlewares/auth.middleware';

export const authRouter = express.Router();

authRouter.post(
  '/signup',
  validate(authValidator.signup),
  validateSameEmailDoesntExist,
  passport.authenticate('signup', { session: false }),
  authController.signup,
);

authRouter.post(
  '/login',
  validate(authValidator.login),
  passport.authenticate('login', { session: false }),
  authController.login,
);


