import { Request, Response, NextFunction } from 'express';

import * as userServices from '../services/user.service';
import httpStatus from 'http-status';
import { User } from '../interfaces/user.interface';

export const validateUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById(parseInt(req.params.id, 10));
  if (!user) {
    res
      .status(httpStatus.NOT_FOUND)
      .send({ message: `User with id ${req.params.id} does not exist` });
  } else {
    req.user = user;
  }

  next();
};

export const validateEmailForSelfUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getUserByEmail(req.body.email);

  if (user && (req.user as User).id !== user.id) {
    console.log('que rayios')
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: `User email already exists` });
  } else {
    next();
  }
};


export const validateEmailForUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getUserByEmail(req.body.email);

  if (user && +req.params.id !== user.id) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: `User email already exists` });
  } else {
    next();
  }
};
