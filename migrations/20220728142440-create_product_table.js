'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price: {
        type: Sequelize.INTEGER,
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
      slug: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shortDescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      longDescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('products');

  }
};


