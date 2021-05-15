import { Request, Response, NextFunction } from 'express';

import * as userServices from '../services/user.service';
import { User } from '../interfaces/user.interface';
import httpStatus from 'http-status';

export const setUserInRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  req.user = user;
  next();
};

export const validateIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  if (user) {
    req.user = user;
    if (user.role === 'ADMIN') {
      next();
      return;
    }
  }
  res
    .status(httpStatus.FORBIDDEN)
    .send({ message: 'User does not have permission to perform this action' });
};
