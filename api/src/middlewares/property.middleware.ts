import { Request, Response, NextFunction } from 'express';

import * as userServices from '../services/user.service';
import * as propertyServices from '../services/property.service';
import httpStatus from 'http-status';
import { User } from '../interfaces/user.interface';
import { RoleEnum } from '../interfaces/role.interface';

export const validateIsRealtorOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);

  if (user) {
    req.user = user;
    if (user.roleId === RoleEnum.Admin) {
      next();
      return;
    }
    if (user.roleId === RoleEnum.Realtor) {
      if (req.body.realtorId === user.id) {
        next();
        return;
      }
    }
  }
  res
    .status(httpStatus.FORBIDDEN)
    .send({ message: 'User does not have permission to perform this action' });
};

export const validatePropertyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params, 'veamos')
  const property = await propertyServices.getById(parseInt(req.params.id, 10));
  if (!property) {
    res
      .status(httpStatus.NOT_FOUND)
      .send({ message: `Property with id ${req.params.id} does not exist` });
  } else {
    req.property = property;
  }

  next();
};

export const validateIsOwnerOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  if (user) {
    req.user = user;
    if (user.roleId === RoleEnum.Admin) {
      next();
      return;
    }
    if (user.roleId === RoleEnum.Realtor) {
      if (req.property?.realtorId === user.id) {
        next();
        return;
      }
    }
  }
  res
    .status(httpStatus.FORBIDDEN)
    .send({ message: 'User does not have permission to perform this action' });
};

export const validateUserCanAccessProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  if (user) {
    req.user = user;
    if (user.roleId === RoleEnum.Admin) {
      next();
      return;
    }
    if (user.roleId === RoleEnum.Realtor) {
      if (req.property?.realtorId === user.id) {
        next();
        return;
      }
    }
    if (user.roleId === RoleEnum.Client) {
      if (req.property?.available) {
        next();
        return;
      }
    }
  }
  res
    .status(httpStatus.FORBIDDEN)
    .send({ message: 'User does not have permission to perform this action' });
};
