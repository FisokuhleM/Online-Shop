//This file holds auth-related routes

const express = require('express');

//Get the controller
const authController = require('../controllers/auth.controller');

const router= express.Router(); 

//Configurations

//Signup
router.get('/signup', authController.getSignUp);
router.post('/signup',authController.signUp);


router.get('/login', authController.getLogin);

module.exports = router;