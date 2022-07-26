'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('enquiries', [{
      id: "f9b327e70bbcf42494ccb28b2d98e00a",
      fullName: 'John Doe',
      email: "johndoe@gmail.com",
      imageUrl: "/image/op.png",
      contactNumber: "9819315895",
      message: "I like your site but I want to join you later.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('enquiries', null, {});

  }
};
