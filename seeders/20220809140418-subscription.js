'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscriptions', [{
      id: "f9b327e70bbcf42494ccb28b2d98e00e",
      name: 'Ram Bahadur',
      email: "johndoe@gmail.com",
      phoneNumber: "9819315895",
      message: "I like your site but I want to join you later.",
      imageUrl: "https://eduera.net/uploads/images/banner/bb5c79b5e65f5eaa87579424e8f414cb1655044897.png",
      amount: "1000000",
      paymentToken: "nchefc734frh34r3478hl",
      product: "Medisys",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscriptions', null, {});

  }
};
