import Sequelize, { ModelDefined, Optional } from 'sequelize';

import { Role } from '../interfaces/role.interface';
import { User } from '.';

export type RoleCreationAttributes = Optional<Role, 'id'>;

export function initRole(
  sequalize: Sequelize.Sequelize
): ModelDefined<Role, RoleCreationAttributes> {
  const attributes = {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  };
  const Role: ModelDefined<Role, RoleCreationAttributes> = sequalize.define(
    'Role',
    attributes,
    {
      tableName: 'roles',
      indexes: [
        {
          fields: ['name'],
          unique: true,
        },
      ],
    }
  );
  User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
  return Role;
}
