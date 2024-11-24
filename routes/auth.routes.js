//This file holds auth-related routes

const express = require('express');

//Get the controller
const authController = require('../controllers/auth.controller');

const router= express.Router(); 

//Configurations
router.get('/signup', authController.getSignUp);
router.get('/login', authController.getSignUp);

module.exports = router;