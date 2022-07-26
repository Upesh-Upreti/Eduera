'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testimonies', {
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
      show: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      testimony: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('testimonies');
  }
};