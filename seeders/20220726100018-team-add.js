'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('People', [{
      name: 'ER. PRAKASH KEJRIWAL',
      designation: "EXECUTIVE DIRECTOR OF LBEF GROUP",
      imageUrl: "https://eduera.net/uploads/images/team/c1ca8f6e055be56d99433f7d9327a76e1655012498.jpg",
      imageAlt: "ER. PRAKASH KEJRIWAL",
      orderNumber: 1,
      show: true,
      facebookLink: "https://eduera.net/team",
      instagramLink: "https://eduera.net/team",
      twitterLink: "https://eduera.net/team",
      linkedinLink: "https://eduera.net/team"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
