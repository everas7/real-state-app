import Joi from 'joi';

export const get = {
  query: Joi.object().keys({
    filters: Joi.object().keys({
      role: Joi.string().valid('CLIENT', 'REALTOR', 'ADMIN'),
    }),
  }),
};
