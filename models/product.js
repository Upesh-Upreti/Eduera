const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
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
        allowNull: false
    },
    longDescription: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Product