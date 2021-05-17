'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('properties', [
      {
        name: 'Nice Apartment with great view',
        description:
          'Equipped with a large kitchen and one small bathroom, it also has a small living room, two bedrooms, a modest dining room, a sun room and a spacious basement. ',
        floorAreaSize: 50,
        price: 2000,
        rooms: 2,
        available: true,
        geolocation: Sequelize.fn(
          'ST_GeomFromText',
          'POINT(35.224902667587614 -78.68551128221793)'
        ),
        address: '7647 Burnett Rd, Godwin, NC 28344',
        realtorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Godwin Large Apartment',
        description:
          'Equipped with a large kitchen and three bathrooms, it also has a living room, 4 bedrooms, a big dining room, a sun room and a spacious basement. ',
        floorAreaSize: 130,
        price: 5000,
        rooms: 4,
        available: true,
        geolocation: Sequelize.fn(
          'ST_GeomFromText',
          'POINT(35.22061006048914 -78.68872049355438)'
        ),
        address: '7432 Burnett Rd, Godwin, NC 28344',
        realtorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nice Apartment with great view',
        description:
          'Equipped with a large kitchen and one small bathroom, it also has a small living room, two bedrooms, a modest dining room, a sun room and a spacious basement. ',
        floorAreaSize: 50,
        price: 2000,
        rooms: 2,
        available: true,
        geolocation: Sequelize.fn(
          'ST_GeomFromText',
          'POINT(35.221235202926614 -78.68638015476928)'
        ),
        address: '9210 Main St, Godwin, NC 28344',
        realtorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Small apartment',
        description:
          'Equipped with a large kitchen and one small bathroom, it also has a small living room, two bedrooms, a modest dining room, a sun room and a spacious basement. ',
        floorAreaSize: 50,
        price: 1000,
        rooms: 1,
        available: true,
        geolocation: Sequelize.fn(
          'ST_GeomFromText',
          'POINT(35.2179695655029 -78.68166434048887)'
        ),
        address: '8969 Main St, Godwin, NC 28344',
        realtorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nice Apartment with great view',
        description:
          'Equipped with a large kitchen and one small bathroom, it also has a small living room, two bedrooms, a modest dining room, a sun room and a spacious basement. ',
        floorAreaSize: 50,
        price: 2000,
        rooms: 2,
        available: true,
        geolocation: Sequelize.fn(
          'ST_GeomFromText',
          'POINT(35.21663920517979 -78.68165604888061)'
        ),
        address: '7315 Edgerton St, Godwin, NC 28344',
        realtorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Amazing Apartment with great view',
        description:
          'Equipped with a large kitchen and one small bathroom, it also has a small living room, two bedrooms, a modest dining room, a sun room and a spacious basement. ',
        floorAreaSize: 50,
        price: 2000,
        rooms: 2,
        available: true,
        geolocation: Sequelize.fn(
          'ST_GeomFromText',
          'POINT(35.221779352229596 -78.68751668108492)'
        ),
        address: '9238 NC-82, Godwin, NC 28344',
        realtorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('properties', null, {});
  },
};
