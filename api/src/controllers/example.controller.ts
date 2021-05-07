import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as exampleService from '../services/example.service';

export const get = async (req: Request, res: Response) => {
  const examples = await exampleService.getAllExamples();
  res.status(httpStatus.OK).send(examples);
};
