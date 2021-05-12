import { Request, Response, NextFunction } from 'express';

import * as userServices from '../services/user.service';
import { User } from '../interfaces/user.interface';

export const setUserInRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  req.user = user;
  next();
};
