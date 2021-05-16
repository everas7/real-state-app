import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as userService from '../services/user.service';
import { toUserDto } from '../dtos/user.dto';
import { User, UserFilters } from '../interfaces/user.interface';

export const get = async (req: Request, res: Response) => {
  const users = (
    await userService.getAll((req.query.filters as UserFilters) || {})
  ).map((u) => toUserDto(u));
  res.status(httpStatus.OK).send(users);
};

export const getCurrent = async (req: Request, res: Response) => {
  const user = await userService.getById((req.user as User).id);
  res.status(httpStatus.OK).send(toUserDto(user!));
};

export const getById = async (req: Request, res: Response) => {
  const user = await userService.getById(parseInt(req.params.id, 10));
  if (!user) {
    throw {
      status: 404,
      message: 'User not found',
    };
  }
  res.status(httpStatus.OK).send(toUserDto(user));
};

export const add = async (req: Request, res: Response) => {
  const user = await userService.add(req.body);
  res.status(httpStatus.OK).send(toUserDto(user));
};

export const update = async (req: Request, res: Response) => {
  const userToUpdate = await userService.getById(parseInt(req.params.id, 10));
  if (!userToUpdate) {
    throw {
      status: 404,
      message: 'User not found',
    };
  }
  const user = await userService.update(userToUpdate?.id, {
    ...userToUpdate,
    ...req.body,
  });
  res.status(httpStatus.OK).send(toUserDto(user));
};


export const remove = async (req: Request, res: Response) => {
  await userService.remove(parseInt(req.params.id, 10));
  res.status(httpStatus.OK).send();
};
