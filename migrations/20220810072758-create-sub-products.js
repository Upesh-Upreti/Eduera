'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subproducts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('subproducts');
  }
};