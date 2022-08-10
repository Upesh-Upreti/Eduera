'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('accounts', [{
      id: "f9b327e70bbcf42494ccb28b2d98c00e",
      name: 'Upesh Upreti',
      email: "upesh@eduera.com",
      role: "admin",
      imageUrl: "https://eduera.net/uploads/images/service/7ea6dcb47308f226cfaa3995dc42fb0e1654580000.jpg",
      imageAlt: "Medisys",
      password: "$2b$10$LfOv1uo9/0z5Pp3MuPK.TOKWjWxuhGKdVjs6zeF1C1p3j9rjviBZ6",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('accounts', null, {});

  }
};
