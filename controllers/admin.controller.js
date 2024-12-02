const Product = require('../models/product.model')

async function getProducts(req,res){
    try{
    const products = await Product.findAll(req.body);
    res.render('admin/product/all-products', {products:products});
}
    catch(error){
        return next(error)
    }
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


async function getUpdateProduct(req,res){
try{
  const product = await Product.findById(req.params.id) 
  res.render('admin/product/update-product', {product:product})
}catch(error){
    next(error);
}

}

async function updateProduct(req,res){
    const product =new Product({
        ...req.body,
        _id: req.params.id
    });

    if(req.file){
    //Replacce the old image with the new one
    product.replaceImage(req.file.filename);
    }

    try{
        await product.save()

    }catch(error){
      next(error);
      return
    }
}


module.exports = {
    getProducts:getProducts,
    getNewProduct:getNewProduct,
    createNewProduct:createNewProduct,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct
}