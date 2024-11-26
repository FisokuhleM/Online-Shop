//This file holds auth-related routes

const express = require('express');

//Get the controller

const router = express.Router();

router.get('/products', function(req, res) {
  res.render('customer/product/all-products');
});

module.exports = router;