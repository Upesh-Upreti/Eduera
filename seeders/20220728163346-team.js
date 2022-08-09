'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teams', [{
      id: "f9b327e70bbcf42494ccb28b2d98e009",
      name: 'Upesh Upreti',
      designation: "CEO",
      show: true,
      orderNumber: 1,
      imageUrl: "https://eduera.net/uploads/images/service/7ea6dcb47308f226cfaa3995dc42fb0e1654580000.jpg",
      imageAlt: "Medisys",
      facebookLink: "https://www.facebook.com",
      instagramLink: "https://www.instagram.com",
      linkedinLink: "https://www.linkedin.com",
      twitterLink: "https://www.twitter.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
