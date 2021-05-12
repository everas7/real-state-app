import { Property } from '../interfaces/property.interface';
import db from '../models';
import { Fn, Literal, Where } from 'sequelize/types/lib/utils';
import { WhereAttributeHash, AndOperator, OrOperator } from 'sequelize/types';
import { PropertyCreationAttributes } from '../models/property.model';

export const findAll = async (): Promise<Property[]> => {
  return db.Property.findAll().then((ul) =>
    ul.map((ul) => ul.get({ plain: true }))
  );
};

type WhereType =
  | Fn
  | Literal
  | Where
  | WhereAttributeHash<Property>
  | AndOperator<Property>
  | OrOperator<Property>
  | undefined;

export const findAllWhere = async (where: WhereType): Promise<Property[]> => {
  return db.Property.findAll({
    where,
  }).then((ul) => ul.map((ul) => ul.get({ plain: true })));
};

export const findById = async (id: number): Promise<Property | undefined> => {
  return db.Property.findByPk(id).then((m) =>
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
