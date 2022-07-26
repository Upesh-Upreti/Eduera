const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Blog = sequelize.define("blog", {
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
        defaultValue: false,
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

module.exports = Blog