import Joi from 'joi';
import { password } from './custom.validator';
import { RoleEnum } from '../interfaces/role.interface';

export const signup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid(RoleEnum.Client, RoleEnum.Realtor),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
