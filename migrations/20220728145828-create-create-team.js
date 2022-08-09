'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imageAlt: {
        type: Sequelize.STRING,
        allowNull: true
      },
      orderNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      show: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      facebookLink: {
        type: Sequelize.STRING,
        allowNull: true
      },
      instagramLink: {
        type: Sequelize.STRING,
        allowNull: true
      },
      linkedinLink: {
        type: Sequelize.STRING,
        allowNull: true
      },
      twitterLink: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};