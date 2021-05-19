import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as photoService from '../services/photo.service';

export const add = async (req: Request, res: Response) => {
  if (req.files.length) {
    await photoService.add({
      property: req.property as any,
      files: req.files as unknown as Express.Multer.File[],
    });
  }

  res.sendStatus(httpStatus.OK);
};

export const remove = async (req: Request, res: Response) => {
  await photoService.remove(
    parseInt(req.params.id, 10),
    (req.query.ids! as string[]).map((id: string) => parseInt(id, 10))
  );
  res.status(httpStatus.OK).send();
};
