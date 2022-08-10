'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('testimonies', [{
      id: "f9b327e70bbcf42494ccb28b2d98a00e",
      name: 'Sagar Adnikari',
      designation: "CEO",
      show: true,
      imageUrl: "https://eduera.net/uploads/images/service/7ea6dcb47308f226cfaa3995dc42fb0e1654580000.jpg",
      imageAlt: "Medisys",
      testimony: "Best service ever.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('testimonies', null, {});
  }
};
