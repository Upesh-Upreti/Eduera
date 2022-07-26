'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('careers', [{
      id: "f9b327e70bbcf42494cdb28b2d98e00e",
      title: 'Software Developer',
      jobType: "Software",
      show: true,
      salary: "50000",
      numberOfVancies: "4",
      imageUrl: "https://eduera.net/uploads/images/service/7ea6dcb47308f226cfaa3995dc42fb0e1654580000.jpg",
      imageAlt: "Medisys",
      shortDescription: "Happyness is a state of mind.",
      longDescription: "Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.Happyness is a state of mind.",
      startDate: "2022/09/17",
      endDate: "2022/09/17",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('careers', null, {});
  }
};
