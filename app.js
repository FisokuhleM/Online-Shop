const path = require('path');

//Get express package
const express = require('express');
const csrf = require('csurf')
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
//Import db object
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleWare = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const updateCartPricesMiddleware= require('./middlewares/update-cart-prices');
const notFoundMiddleware = require('./middlewares/not-found');
//Import Auth routes
const authRoutes= require('./routes/auth.routes')

const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');

//Derive app object by executing express as a function
const app = express();


//Set view option
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const sesssionConfig = createSessionConfig();

app.use(expressSession(sesssionConfig));
//For CSRF!!!
app.use(csrf());

app.use(cartMiddleware);

//Use the csrf token middleware
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);
app.use(updateCartPricesMiddleware);




//register routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use('/cart',cartRoutes);
app.use('/orders',protectRoutesMiddleware,ordersRoutes);
app.use('/admin',protectRoutesMiddleware,adminRoutes);
app.use(notFoundMiddleware);


//Make sure that it is placed after the routes are registered!!
app.use(errorHandlerMiddleWare)

//Connect to the database
db.connectToDatabase()
.then(function (){
    app.listen(3000);
})
.catch(function(error){
    console.log('Failed to connect to the database');
    console.log('error');
}); //Async functions always yield promises
//Make the app listen to Port 3000
