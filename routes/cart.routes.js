//This file holds auth-related routes

const express = require('express');

const cartController = require('../controllers/cart.controller');


const router = express.Router();

router.get('/', cartController.getCart); // /cart/

router.post('/items', cartController.addCartItem);

router.patch('/items',cartController.updateCartItem);

module.exports = router;