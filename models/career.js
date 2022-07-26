'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Career extends Model {
    static associate(models) {
    }
  }
  Career.init({
    title: DataTypes.STRING,
    jobType: DataTypes.STRING,
    numberOfVancies: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    imageAlt: DataTypes.STRING,
    show: DataTypes.BOOLEAN,
    salary: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    longDescription: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Career',
    tableName: "careers"
  });
  return Career;
};