import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import * as propertyService from '../services/property.service';
import * as userService from '../services/user.service';
import { toPropertyDto, toPropertyDetailedDto } from '../dtos/property.dto';
import { User } from '../interfaces/user.interface';

export const get = async (req: Request, res: Response) => {
  const properties = (await propertyService.getAll(req.user as User)).map((u) =>
    toPropertyDto(u)
  );
  res.status(httpStatus.OK).send(properties);
};

export const getById = async (req: Request, res: Response) => {
  const realtor = await userService.getById(req.property!.realtorId);
  res.status(httpStatus.OK).send(toPropertyDetailedDto(req.property!, realtor!));
};

export const add = async (req: Request, res: Response) => {
  const property = await propertyService.add({
    ...req.body,
    geolocation: {
      type: 'Point',
      coordinates: [
        req.body.geolocation.latitude,
        req.body.geolocation.longitude,
      ],
    },
  });
  res.status(httpStatus.OK).send(toPropertyDetailedDto(property));
};

export const update = async (req: Request, res: Response) => {
  const property = await propertyService.update(parseInt(req.params.id, 10), {
    ...req.body,
    geolocation: {
      type: 'Point',
      coordinates: [
        req.body.geolocation.latitude,
        req.body.geolocation.longitude,
      ],
    },
  });
  console.log(property, 'KLk')
  res.status(httpStatus.OK).send(toPropertyDetailedDto(property));
};

export const remove = async (req: Request, res: Response) => {
  await propertyService.remove(parseInt(req.params.id, 10));
  res.status(httpStatus.OK).send();
};
