import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as photoService from '../services/photo.service';
import { User } from '../interfaces/user.interface';
import datauri from 'datauri';
import { uploadImage } from '../helpers/cloudinary';

export const add = async (req: Request, res: Response) => {
  console.log(req.files, 'no?');
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
