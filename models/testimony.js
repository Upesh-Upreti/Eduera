const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Testimony = sequelize.define("testimony", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    designation: {
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
    testimony: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Testimony