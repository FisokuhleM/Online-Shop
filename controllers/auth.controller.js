const User = require('../models/user.model')

function getSignUp(req,res){
res.render('customer/auth/signup');
}

//Function for creating user data
async function signUp(req,res){
    //Validate incoming user data
    
    //Create user in the database
   const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
    );
    await user.signup();
    res.redirect('/login');
}

function getLogin(req,res){
    res.render('customer/auth/login');
}

module.exports = {
    getSignUp: getSignUp,
    getLogin:getLogin,
    signUp:signUp
};