'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimony extends Model {
    static associate(models) {
      // define association here
    }
  }
  Testimony.init({
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    imageAlt: DataTypes.STRING,
    show: DataTypes.BOOLEAN,
    Testimony: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Testimony',
    tableName: "testimonies"
  });
  return Testimony;
};