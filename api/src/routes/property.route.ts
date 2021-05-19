import express from 'express';
import { validate } from 'express-validation';

import * as propertyController from '../controllers/property.controller';
import * as photoController from '../controllers/photo.controller';
import * as propertyValidator from '../validators/property.validator';
import * as photoValidator from '../validators/photo.validator';
import { catchAsync } from '../helpers/catchAsync';
import {
  validateIsRealtorOrAdmin,
  validatePropertyExists,
  validateIsOwnerOrAdmin,
  validateUserCanAccessProperty,
} from '../middlewares/property.middleware';
import { setUserInRequest } from '../middlewares/custom.middleware';
import upload from '../helpers/multer';

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

propertyRouter.post(
  '/:id/photos',
  validate(photoValidator.add),
  validatePropertyExists,
  validateIsOwnerOrAdmin,
  upload.array('photos', 10),
  catchAsync(photoController.add)
);


propertyRouter.delete(
  '/:id/photos',
  validate(photoValidator.remove),
  validatePropertyExists,
  validateIsOwnerOrAdmin,
  catchAsync(photoController.remove)
);
