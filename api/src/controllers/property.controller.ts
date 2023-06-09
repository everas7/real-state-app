import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as propertyService from '../services/property.service';
import * as userService from '../services/user.service';
import { toPropertyDto, toPropertyDetailedDto } from '../dtos/property.dto';
import { User } from '../interfaces/user.interface';
import { PropertyFilters } from '../interfaces/property.interface';

export const get = async (req: Request, res: Response) => {
  const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
  const page = req.query.page ? +req.query.page : 1;
  const result = await propertyService.getAll(
    req.user as User,
    (req.query.filters as PropertyFilters) || {},
    {
      pageSize,
      page,
    }
  );
  const totalPages = Math.ceil(result.count / pageSize);
  res.setHeader('Total-Pages', totalPages);
  res.status(httpStatus.OK).send(result.rows.map((u) => toPropertyDto(u)));
};

export const getById = async (req: Request, res: Response) => {
  const realtor = await userService.getById(req.property!.realtorId);
  res
    .status(httpStatus.OK)
    .send(toPropertyDetailedDto(req.property!, realtor!));
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
  res.status(httpStatus.OK).send(toPropertyDetailedDto(property));
};

export const remove = async (req: Request, res: Response) => {
  await propertyService.remove(parseInt(req.params.id, 10));
  res.status(httpStatus.OK).send();
};
