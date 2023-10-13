const { DataTypes, Model } = require('sequelize')

const db = require('../database/connection')

const User = db.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        require: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        require: true,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        require: true,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        require: true,
        type: DataTypes.STRING
    }
})

module.exports = User