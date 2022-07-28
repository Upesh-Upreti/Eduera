const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Career = sequelize.define("career", {
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
    jobType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    salary: {
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
        defaultValue: true,
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    shortDescription: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    longDescription: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Career