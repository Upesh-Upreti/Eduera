'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('enquiries', [{
      id: "f9b327e70bbcf42494ccb28b2d98e00e",
      name: 'Ram Bahadur',
      email: "johndoe@gmail.com",
      phoneNumber: "9819315895",
      message: "I like your site but I want to join you later.",
      amount: "1000000",
      paymentToken: "nchefc734frh34r3478hl",
      product: "Medisys",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enquiries', null, {});

  }
};
