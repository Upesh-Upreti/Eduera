const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Team = sequelize.define("team", {
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
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageAlt: {
        type: Sequelize.STRING,
        allowNull: true
    },
    orderNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    show: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
    facebookLink: {
        type: Sequelize.STRING,
        allowNull: true
    },
    instagramLink: {
        type: Sequelize.STRING,
        allowNull: true
    },
    linkedinLink: {
        type: Sequelize.STRING,
        allowNull: true
    },
    twitterLink: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Team