import express from 'express';
import { validate } from 'express-validation';

import * as propertyController from '../controllers/property.controller';
import * as propertyValidator from '../validators/property.validator';
import { catchAsync } from '../helpers/catchAsync';
import {
  validateIsRealtorOrAdmin,
  validatePropertyExists,
  validateIsOwnerOrAdmin,
  validateUserCanAccessProperty,
} from '../middlewares/property.middleware';
import { setUserInRequest } from '../middlewares/custom.middleware';

export const propertyRouter = express.Router();

propertyRouter.get(
  '/',
  validate(propertyValidator.get),
  setUserInRequest,
  catchAsync(propertyController.get)
);

propertyRouter.get(
  '/:id',
  validate(propertyValidator.getById),
  validatePropertyExists,
  validateUserCanAccessProperty,
  catchAsync(propertyController.getById)
);

propertyRouter.post(
  '/',
  validate(propertyValidator.create),
  validateIsRealtorOrAdmin,
  catchAsync(propertyController.add)
);

propertyRouter.put(
  '/:id',
  validate(propertyValidator.update),
  validatePropertyExists,
  validateIsOwnerOrAdmin,
  catchAsync(propertyController.update)
);

propertyRouter.delete(
  '/:id',
  validatePropertyExists,
  validateIsOwnerOrAdmin,
  catchAsync(propertyController.remove)
);
