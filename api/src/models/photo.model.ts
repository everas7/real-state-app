import Sequelize, { ModelDefined, Optional } from 'sequelize';
import { User, Property } from '.';
import { Photo } from '../interfaces/photo.interface';

export type PhotoCreationAttributes = Optional<Photo, 'id'>;

export function initPhoto(
  sequalize: Sequelize.Sequelize
): ModelDefined<Photo, PhotoCreationAttributes> {
  const attributes = {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: { type: Sequelize.STRING, allowNull: false },
    propertyId: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  };

  const Photo: ModelDefined<Photo, PhotoCreationAttributes> = sequalize.define(
    'Photo',
    attributes,
    {
      tableName: 'photos',
    }
  );

  Property.hasMany(Photo, {
    sourceKey: 'id',
    foreignKey: 'propertyId',
    as: 'photos',
  });

  Photo.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

  return Photo;
}
