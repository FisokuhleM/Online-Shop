const Order = require('../models/order.model');
const User = require('../models/user.model');

async function getOrders(req, res) {
    try {
      const orders = await Order.findAllForUser(res.locals.uid);
      res.render('customer/orders/all-orders', {
        orders: orders,
      });
    } catch (error) {
      next(error);
    }
  }

async function addOrder(req,res,next){
    const cart = res.locals.cart;
    let userDocument
    //Get the user document
    try{
        userDocument = await User.findById(res.locals.uid);
    }catch(error){
        return next(error);
    }
    //translate to order data
    const order = new Order(cart,userDocument);

    try {
        await order.save();
    } catch (error) {
        return next(error);
    }

    req.session.cart = null; //Clear the cart
    
    res.redirect('/orders');
}


module.exports = {
    addOrder : addOrder,
    getOrders: getOrders,
};