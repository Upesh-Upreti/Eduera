const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.SCHEMA, process.env.USER, process.env.PASSWORD, {
    dialect: process.env.DIALECT,
    host: process.env.HOST
});

module.exports = sequelize;
