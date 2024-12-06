const Product = require('../models/product.model');

async function addCartItem(req,res){
    let product;
    try{
      product = await Product.findAll(req.body.productId);
    }catch(error){
        next(error);
        return;
    }
    
    const cart = res.locals.cart;
    res.locals.cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
        message:'Cart Updated',
        newTotalItems: cart.totalQuantity
    });
}

module.exports = {
    addCartItem: addCartItem
};