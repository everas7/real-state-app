import Sequelize, { ModelDefined, Optional } from 'sequelize';

import { User } from '../interfaces/user.interface';

export type UserCreationAttributes = Optional<User, 'id'>;

export function initUser(
  sequalize: Sequelize.Sequelize
): ModelDefined<User, UserCreationAttributes> {
  const attributes = {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    roleId: { type: Sequelize.STRING, allowNull: false },
  };
  const User: ModelDefined<User, UserCreationAttributes> = sequalize.define(
    'User',
    attributes,
    {
      tableName: 'users',
      indexes: [
        {
          fields: ['email'],
          unique: true,
        },
      ],
    }
  );
  return User;
}
