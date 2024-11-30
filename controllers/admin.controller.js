const Product = require('../models/product.model')

function getProducts(req,res){
    res.render('admin/product/all-products');
}

function getNewProduct(req,res){
    res.render('admin/product/new-product');
}

async function createNewProduct(req,res,next){
const product = new Product({
    ...req.body,
    image:req.file.filename
});

try{
   await product.save();
}catch(error){
    return next(error);
}

    res.redirect('/admin/products');
}

module.exports = {
    getProducts:getProducts,
    getNewProduct:getNewProduct,
    createNewProduct:createNewProduct
}