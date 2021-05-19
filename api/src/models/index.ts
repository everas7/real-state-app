import { Sequelize } from 'sequelize';

import { initUser } from './user.model';
import { initProperty } from './property.model';
import { sequelizeGeoFix } from '../helpers/sequelizeFix';
import { initPhoto } from './photo.model';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database.js')[env];

sequelizeGeoFix();

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
export const User = initUser(sequelize);
export const Property = initProperty(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
  Property,
  Photo: initPhoto(sequelize)
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
