import { Request, Response, NextFunction } from 'express';

export const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (err.status < 500 || err.statusCode < 500) {
        next(err);
      } else {
        console.log(err);
        next(new Error('Server Error'));
      }
    });
  };
