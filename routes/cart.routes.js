//This file holds auth-related routes

const express = require('express');

const cartController = require('../controllers/cart.controller')

const router = express.Router();

router.get('/signup', authController.getSignUp);

router.post('/signup', authController.signUp);

router.get('/login', authController.getLogin);

router.post('/login', authController.login);

router.post('/logout',authController.logout);

module.exports = router;