import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as userService from '../services/user.service';
import { toUserDto } from '../dtos/user.dto';
import { User } from '../interfaces/user.interface';

export const get = async (req: Request, res: Response) => {
  const users = (await userService.getAll()).map((u) => toUserDto(u));
  res.status(httpStatus.OK).send(users);
};

export const getCurrent = async (req: Request, res: Response) => {
  const user = await userService.getById((req.user as User).id);
  res.status(httpStatus.OK).send(toUserDto(user!));
};
