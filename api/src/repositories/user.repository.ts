import { User } from '../interfaces/user.interface';
import db from '../models';
import { UserCreationAttributes } from '../models/user.model';
import { Fn, Literal, Where } from 'sequelize/types/lib/utils';
import { WhereAttributeHash, AndOperator, OrOperator } from 'sequelize/types';
import { Property } from '../interfaces/property.interface';

type WhereType =
  | Fn
  | Literal
  | Where
  | WhereAttributeHash<Property>
  | AndOperator<Property>
  | OrOperator<Property>
  | undefined;

export const findAll = async (): Promise<User[]> => {
  return db.User.findAll().then((ul) =>
    ul.map((ul) => ul.get({ plain: true }))
  );
};

export const findAllWhere = async (where: WhereType): Promise<User[]> => {
  return db.User.findAll({
    where,
  }).then((ul) => ul.map((ul) => ul.get({ plain: true })));
};

export const findById = async (id: number): Promise<User | undefined> => {
  return db.User.findByPk(id).then((m) =>
    m?.get({
      plain: true,
    })
  );
};

export const findByEmail = async (email: string): Promise<User | undefined> => {
  return db.User.findOne({
    where: {
      email,
    },
  }).then((m) =>
    m?.get({
      plain: true,
    })
  );
};

export const create = async (user: UserCreationAttributes): Promise<User> => {
  return db.User.create(user).then(
    (u) => findById(u.getDataValue('id')) as Promise<User>
  );
};

export const update = async (
  id: number,
  user: UserCreationAttributes
): Promise<User> => {
  return db.User.update(user, {
    where: {
      id,
    },
  }).then(() => findById(id) as Promise<User>);
};

export const remove = async (id: number): Promise<number> => {
  return db.User.destroy({
    where: {
      id,
    },
  });
};
