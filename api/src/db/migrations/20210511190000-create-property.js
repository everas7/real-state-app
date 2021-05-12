'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('properties', {
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
      geolocation: {
        type: Sequelize.GEOMETRY('POINT', 4326),
        allowNull: false,
      },
      address: { type: Sequelize.STRING, allowNull: true },
      realtorId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('properties');
  },
};
