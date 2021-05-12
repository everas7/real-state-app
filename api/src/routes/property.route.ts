import express from 'express';
import { validate } from 'express-validation';

import * as propertyController from '../controllers/property.controller';
import * as propertyValidator from '../validators/property.validator';
import { catchAsync } from '../helpers/catchAsync';

export const propertyRouter = express.Router();

propertyRouter.get('/', catchAsync(propertyController.get));

propertyRouter.post(
  '/',
  validate(propertyValidator.create),
  catchAsync(propertyController.add)
);
