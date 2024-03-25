// to check the login for all time 


const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;



const authMiddleware = (req, res, next) =>{
    const token = req.cookie.token;
    if(!token)
    return res.status(401).json({message: "Not authorized"});

    try {
        const decode = jwt.verify(token, jwtSecret);
        req.userId = decode.userId;
    } catch (error) {
        res.status(401).json({message: "Not authorized"});
    }
}

module.exports = authMiddleware;