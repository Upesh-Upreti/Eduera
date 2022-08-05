'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Contacts', [{
      fullName: 'John Doe',
      email: "johndoe@gmail.com",
      contactNumber: "9819315895",
      message: "I like your site but I want to join you later.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Contacts', null, {});

  }
};
