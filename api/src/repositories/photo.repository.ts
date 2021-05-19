import { Photo } from '../interfaces/photo.interface';
import db, { User } from '../models';
import { Fn, Literal, Where } from 'sequelize/types/lib/utils';
import {
  WhereAttributeHash,
  AndOperator,
  OrOperator,
} from 'sequelize/types';
import { Op } from 'sequelize';

import { PhotoCreationAttributes } from '../models/photo.model';
import { Pagination, PaginatedResult } from '../interfaces/custom.interface';

type WhereType =
  | Fn
  | Literal
  | Where
  | WhereAttributeHash<Photo>
  | AndOperator<Photo>
  | OrOperator<Photo>
  | undefined;

export const findById = async (id: number): Promise<Photo | undefined> => {
  return db.Photo.findByPk(id, {
    include: 'realtor',
  }).then((m) =>
    m?.get({
      plain: true,
    })
  );
};

export const bulkCreate = async (
  photos: PhotoCreationAttributes[]
): Promise<void> => {
  await db.Photo.bulkCreate(photos);
};

export const bulkRemove = async (
  propertyId: number,
  ids: number[]
): Promise<number> => {
  return db.Photo.destroy({
    where: {
      propertyId,
      id: {
        [Op.in]: [...ids],
      },
    },
  });
};
