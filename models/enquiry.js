'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enquiry.init({
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    amount: DataTypes.STRING,
    paymentToken: DataTypes.STRING,
    product: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Enquiry',
    tableName: "enquiries"
  });
  return Enquiry;
};