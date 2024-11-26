//Get express package
const express = require('express');
const csrf = require('csurf')
const path = require('path');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
//Import db object
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleWare = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
//Import Auth routes
const authRoutes= require('./routes/auth.routes')

const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');

//Derive app object by executing express as a function
const app = express();


//Set view option
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

const sesssionConfig = createSessionConfig();
app.use(expressSession(sesssionConfig));
//For CSRF!!!
app.use(csrf());

//Use the csrf token middleware
app.use(addCsrfTokenMiddleware)
app.use(checkAuthStatusMiddleware);
app.use(errorHandlerMiddleWare)


//register routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);


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
