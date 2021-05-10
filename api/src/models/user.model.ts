import Sequelize, { ModelDefined, Optional } from 'sequelize';

import { User } from '../interfaces/user.interface';

interface UserCreationAttributes extends Optional<User, 'id'> {}

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
    role: { type: Sequelize.STRING, allowNull: false },
  };
  const User: ModelDefined<
    User,
    UserCreationAttributes
  > = sequalize.define('User', attributes, { tableName: 'users' });
  return User;
}
