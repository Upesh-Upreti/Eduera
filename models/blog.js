'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      // define association here
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
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
    modelName: 'Blog',
    tableName: "blogs"
  });
  return Blog;
};