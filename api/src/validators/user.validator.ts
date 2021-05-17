import Joi from 'joi';
import { password } from './custom.validator';
import { RoleEnum } from '../interfaces/role.interface';

export const get = {
  query: Joi.object().keys({
    filters: Joi.object().keys({
      role: Joi.number().valid(
        RoleEnum.Client,
        RoleEnum.Realtor,
        RoleEnum.Admin
      ),
    }),
  }),
};

export const patch = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().custom(password),
    role: Joi.number().valid(RoleEnum.Client, RoleEnum.Realtor, RoleEnum.Admin),
  }),
};

export const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
    role: Joi.number()
      .valid(RoleEnum.Client, RoleEnum.Realtor, RoleEnum.Admin)
      .required(),
  }),
};
