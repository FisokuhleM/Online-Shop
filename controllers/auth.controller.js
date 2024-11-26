const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const userDetailsAreValid = require('../util/validation');
const validation = require('../util/validation');
function getSignUp(req,res){
res.render('customer/auth/signup');
}

//Function for creating user data
async function signUp(req,res,next){

//Validate incoming user data
if (!validation.userDetailsAreValid(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
      ) || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
    ){
    res.redirect('/signup');
    return;
}
    //Create user in the database
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
        );


try{
    const existsAlready = await user.existsAlready();
    if(existsAlready){
        res.redirect('/signup')
        return; 
    }
    
    await user.signup();
    }catch(error){
        next(error);
        return;
    }
    
    res.redirect('/login');
}

function getLogin(req,res){
    res.render('customer/auth/login');
}

async function login (req,res){
const user = new User(req.body.email, req.body.password);
let existingUser;
try{
  existingUser = await user.getUserWithSameEmail();
}catch(error){
    next(error);
    return;
}

//Check if the user exists
if(!existingUser){
    //avoid executing any other code
    //Redirect to login
    res.redirect('/login');
    return;
}



//Check the password
const passwordIsCorrect = await user.comparePassword(existingUser.password);
if(!passwordIsCorrect){
    res.redirect('/login');
    return;
}

authUtil.createUserSession(req, existingUser, function (){
    res.redirect('/'); //Could be the Home page
});

}


//Logout function
function logout(req,res){
    authUtil.destroyUserAuthSession(req);
    res.redirect('/login');
}

module.exports = {
    getSignUp: getSignUp,
    getLogin:getLogin,
    signUp:signUp,
    login: login,
    logout:logout

};