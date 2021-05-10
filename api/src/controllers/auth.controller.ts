import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import { toSignupResponseDto } from '../dtos/auth.dto';
import { User } from '../interfaces/user.interface';


export const signup = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    user: toSignupResponseDto(req.user as User),
  });
};

export const login = async (req: Request, res: Response) => {
  const body = { email: (req.user as User).email };
  const accessToken = jwt.sign({ user: body }, 'TOP_SECRET');

  res.status(httpStatus.OK).json({
    accessToken,
  });
};
