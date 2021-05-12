import { Sequelize } from 'sequelize';

import { initUser } from './user.model';
import { initProperty } from './property.model';
import { sequelizeGeoFix } from '../helpers/sequelizeFix';

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

const db = {
  sequelize,
  Sequelize,
  User,
  Property: initProperty(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
