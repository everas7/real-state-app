import Sequelize, { ModelDefined, Optional } from 'sequelize';

import { Property } from '../interfaces/property.interface';
import { User } from '.';

export interface PropertyCreationAttributes extends Optional<Property, 'id'> {}

export function initProperty(
  sequalize: Sequelize.Sequelize
): ModelDefined<Property, PropertyCreationAttributes> {
  const attributes: Sequelize.ModelAttributes<
    Sequelize.Model<Property, PropertyCreationAttributes>
  > = {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: true },
    floorAreaSize: { type: Sequelize.INTEGER, allowNull: false },
    price: { type: Sequelize.DOUBLE, allowNull: false },
    rooms: { type: Sequelize.INTEGER, allowNull: false },
    available: { type: Sequelize.BOOLEAN, allowNull: false },
    geolocation: { type: Sequelize.GEOMETRY('POINT', 4326), allowNull: false },
    address: { type: Sequelize.STRING, allowNull: true },
    realtorId: { type: Sequelize.INTEGER, allowNull: false },
  };
  const Property: ModelDefined<
    Property,
    PropertyCreationAttributes
  > = sequalize.define('Property', attributes, { tableName: 'properties' });

  User.hasMany(Property, {
    sourceKey: 'id',
    foreignKey: 'realtorId',
    as: 'properties',
  });

  return Property;
}
