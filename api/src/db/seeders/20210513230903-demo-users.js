'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Client',
        email: 'jclient@test.com',
        roleId: 3,
        password: await bcrypt.hash('klkconklk1', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mary Realtor',
        email: 'mrealtor@test.com',
        roleId: 2,
        password: await bcrypt.hash('klkconklk1', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ryan Realtor',
        email: 'rrealtor@test.com',
        roleId: 2,
        password: await bcrypt.hash('klkconklk1', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Peter Admin',
        email: 'padmin@test.com',
        roleId: 1,
        password: await bcrypt.hash('klkconklk1', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
