import { Property } from '../interfaces/property.interface';
import db, { User } from '../models';
import { Fn, Literal, Where } from 'sequelize/types/lib/utils';
import { WhereAttributeHash, AndOperator, OrOperator } from 'sequelize/types';
import { PropertyCreationAttributes } from '../models/property.model';
import { Pagination, PaginatedResult } from '../interfaces/custom.interface';

type WhereType =
  | Fn
  | Literal
  | Where
  | WhereAttributeHash<Property>
  | AndOperator<Property>
  | OrOperator<Property>
  | undefined;

export const findAll = async (): Promise<Property[]> => {
  return db.Property.findAll().then((ul) =>
    ul.map((ul) => ul.get({ plain: true }))
  );
};

export const findAllWhere = async (
  where: WhereType,
  { page, pageSize }: Pagination
): Promise<PaginatedResult<Property>> => {
  const offset = Math.max(0, page! - 1) * pageSize!;
  const limit = pageSize;
  return db.Property.findAndCountAll({
    where,
    offset,
    limit,
    include: 'photos',
  }).then((res) => ({
    count: res.count,
    rows: res.rows.map((p) => p.get({ plain: true })),
  }));
};

export const findById = async (id: number): Promise<Property | undefined> => {
  return db.Property.findByPk(id, {
    include: ['realtor', 'photos'],
  }).then((m) =>
    m?.get({
      plain: true,
    })
  );
};

export const create = async (
  property: PropertyCreationAttributes
): Promise<Property> => {
  return db.Property.create(property).then(
    (u) => findById(u.getDataValue('id')) as Promise<Property>
  );
};

export const update = async (
  id: number,
  property: PropertyCreationAttributes
): Promise<Property> => {
  return db.Property.update(property, {
    where: {
      id,
    },
  }).then(() => findById(id) as Promise<Property>);
};

export const remove = async (id: number): Promise<number> => {
  return db.Property.destroy({
    where: {
      id,
    },
  });
};
