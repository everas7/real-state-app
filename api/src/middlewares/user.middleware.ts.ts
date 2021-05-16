import { Request, Response, NextFunction } from 'express';

import * as userServices from '../services/user.service';
import httpStatus from 'http-status';

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
