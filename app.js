//Get express package
const express = require('express');

const path = require('path');

//Import Auth routes
const authRoutes= require('./routes/auth.routes')

//Derive app object by executing express as a function
const app = express();


//Set view option
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

//register routes
app.use(authRoutes);



//Make the app listen to Port 3000
app.listen(3000);