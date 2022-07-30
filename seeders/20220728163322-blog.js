'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Blogs', [{
      title: 'Happyness is a state of mind',
      category: "Lifestyle",
      show: true,
      imageUrl: "https://eduera.net/uploads/images/service/7ea6dcb47308f226cfaa3995dc42fb0e1654580000.jpg",
      imageAlt: "Medisys",
      slug: "Happyness",
      shortDescription: "Happyness is a state of mind.",
      longDescription: "Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Blogs', null, {});
  }
};
