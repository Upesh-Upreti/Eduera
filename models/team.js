'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      // define association here
    }
  }
  Team.init({
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    imageAlt: DataTypes.STRING,
    orderNumber: DataTypes.INTEGER,
    show: DataTypes.BOOLEAN,
    facebookLink: DataTypes.STRING,
    instagramLink: DataTypes.STRING,
    linkedinLink: DataTypes.STRING,
    twitterLink: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Team',
    tableName: "teams"
  });
  return Team;
};