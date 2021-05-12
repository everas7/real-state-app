import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import * as propertyService from '../services/property.service';
import { toPropertyDto } from '../dtos/property.dto';

export const get = async (req: Request, res: Response) => {
  const properties = (await propertyService.getAll()).map((u) =>
    toPropertyDto(u)
  );
  res.status(httpStatus.OK).send(properties);
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
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
  console.log('no LLEGA ACA')
  res.status(httpStatus.OK).send(toPropertyDto(property));
};
