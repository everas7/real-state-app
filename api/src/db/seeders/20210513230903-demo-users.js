'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Client',
        email: 'jclient@test.com',
        role: 'CLIENT',
        password: await bcrypt.hash('klkconklk1', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mary Realtor',
        email: 'mrealtor@test.com',
        role: 'REALTOR',
        password: await bcrypt.hash('klkconklk1', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Peter Admin',
        email: 'padmin@example.com',
        role: 'ADMIN',
        password: await bcrypt.hash('klkconklk1', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
