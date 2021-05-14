import Joi from 'joi';

export const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    floorAreaSize: Joi.number().required(),
    price: Joi.number().required(),
    rooms: Joi.number().required(),
    available: Joi.boolean().required(),
    geolocation: Joi.object().keys({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }).required(),
    address: Joi.string().required(),
    realtorId: Joi.number().required(),
  }),
};

export const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    floorAreaSize: Joi.number().required(),
    price: Joi.number().required(),
    rooms: Joi.number().required(),
    available: Joi.boolean().required(),
    geolocation: Joi.object().keys({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }).required(),
    address: Joi.string().required(),
    realtorId: Joi.number().required(),
  }),
};