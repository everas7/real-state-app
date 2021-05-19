import Joi from 'joi';

export const add = {
  params: Joi.object().keys({ id: Joi.number().required() }),
};

export const remove = {
  query: Joi.object().keys({ ids: Joi.array().items(Joi.number()) }),
};
