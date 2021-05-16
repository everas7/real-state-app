import Joi from 'joi';
import { password } from './custom.validator';

export const get = {
  query: Joi.object().keys({
    filters: Joi.object().keys({
      role: Joi.string().valid('CLIENT', 'REALTOR', 'ADMIN'),
    }),
  }),
};

export const patch = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().custom(password),
    role: Joi.string().valid('CLIENT', 'REALTOR'),
  }),
};

export const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
    role: Joi.string().valid('CLIENT', 'REALTOR').required(),
  }),
};
