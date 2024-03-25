// Defining models for the posts 

const sequelize = require('../config/db');
const DataType = require('sequelize');

const Post = sequelize.define("posts", {
    title:{
        type: DataType.STRING,
        required: true
    }, 
    body:{
        type: DataType.STRING,
        required: true
    },
    createdAt:{
        type: DataType.TIME,
        default: sequelize.NOW
    },
    updatedAt:{
        type: DataType.TIME,
        default: sequelize.NOW
    },
});

module.exports = Post; 