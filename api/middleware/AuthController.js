const express = require("express");
const router = express.Router();
var VerifyToken = require('./VerifyToken');
const User = require("../models/login");

// ..

const authHandlerMiddleware = async (err, req, res, next) => {
    
}

module.exports = authHandlerMiddleware;