import { User } from '../interfaces/user.interface';
import db from '../models';
import { UserCreationAttributes } from '../models/user.model';

export const findAll = async (): Promise<User[]> => {
  return db.User.findAll().then((ul) =>
    ul.map((ul) => ul.get({ plain: true }))
  );
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

export const create = async (user: UserCreationAttributes): Promise<User | undefined> => {
  return db.User.create(user).then((u) => findById(u.getDataValue('id')));
};
