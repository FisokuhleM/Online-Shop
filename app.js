//Get express package
const express = require('express');

//Import db object
const db = require('./data/database')
const path = require('path');

//Import Auth routes
const authRoutes= require('./routes/auth.routes')

//Derive app object by executing express as a function
const app = express();


//Set view option
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

//register routes
app.use(authRoutes);

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
