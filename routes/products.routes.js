//This file holds auth-related routes

const express = require('express');
const productsController = require('../controllers/products.controller');

//Get the controller

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductDetails);

module.exports = router;