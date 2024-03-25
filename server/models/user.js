// Defining models for the users 

const sequelize = require('../config/db');
const DataType = require('sequelize');

const User = sequelize.define("user", {

    username:{
        type: DataType.STRING,
        required: true,
        unique: true
    },
    password:{
        type: DataType.STRING,
        required: true,
    }
});


module.exports = User;