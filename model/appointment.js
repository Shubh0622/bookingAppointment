const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Appointment = sequelize.define('appointment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    number: {
        type: Sequelize.INTEGER,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    }
})

module.exports = Appointment;