import Joi from 'joi';

export const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    floorAreaSize: Joi.number().required(),
    price: Joi.number().required(),
    rooms: Joi.number().required(),
    available: Joi.boolean().required(),
    geolocation: Joi.object()
      .keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      })
      .required(),
    address: Joi.string().required(),
    realtorId: Joi.number().required(),
  }),
};

export const get = {
  query: Joi.object().keys({
    filters: Joi.object().keys({
      minFloorAreaSize: Joi.number(),
      maxFloorAreaSize: Joi.number(),
      minPrice: Joi.number(),
      maxPrice: Joi.number(),
      rooms: Joi.array().items(Joi.number()),
    }),
    page: Joi.number().greater(0),
    pageSize: Joi.number().greater(0),
  }),
};

export const getById = {
  params: Joi.object().keys({ id: Joi.number().required() }),
};

export const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    floorAreaSize: Joi.number().required(),
    price: Joi.number().required(),
    rooms: Joi.number().required(),
    available: Joi.boolean().required(),
    geolocation: Joi.object()
      .keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      })
      .required(),
    address: Joi.string().required(),
    realtorId: Joi.number().required(),
  }),
};
