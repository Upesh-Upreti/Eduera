'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubProducts.init({
    title: DataTypes.STRING,
    parentId: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    imageAlt: DataTypes.STRING,
    show: DataTypes.BOOLEAN,
    slug: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    longDescription: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'SubProducts',
    tableName: "subproducts"
  });
  return SubProducts;
};