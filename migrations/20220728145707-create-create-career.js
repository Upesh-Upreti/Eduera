'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('careers', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      numberOfVancies: {
        type: Sequelize.STRING,
        allowNull: true
      },
      jobType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      salary: {
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
        defaultValue: true,
      },
      startDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      endDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shortDescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      longDescription: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('careers');
  }
};