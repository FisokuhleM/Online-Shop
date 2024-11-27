const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const userDetailsAreValid = require('../util/validation');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash')



function getSignUp(req,res){
let sessionData = sessionFlash.getSessionData(req);
if(!sessionData){
    sessionData = {
        email: '',
        confirmEmail:'',
        password:'',
        fullname:'',
        street:'',
        postal:'',
        city:''
    };
}
res.render('customer/auth/signup',{inputData: sessionData});
}

//Function for creating user data
async function signUp(req,res,next){
const enteredData= {
        email:req.body.email,
        confirmEmail: req.body['confirm-email'],
        password: req.body.password,
        fullname: req.body.fullname,
        street: req.body.street,
        postal:req.body.postal,
        city: req.body.city
};
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
    sessionFlash.flashDataToSession(req, {
        errorMessage: 'Please check your input. Password must be at least 6 characters long, postal code must be 4 characters long.',
        ...enteredData //Spread operator ---> spreads data into key object pairs
    }, 
    function(){
        res.redirect('/signup');
    })    
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
        sessionFlash.flashDataToSession(req,{
            errorMessage: 'User exists already! Try logging in instead!!',
            ...enteredData
        },
            function(){
            res.redirect('/signup')
        });
        return; 
    }
    
    await user.signup();
    }catch(error){
        next(error);
        return;
    }
    
    res.redirect('/login');
}

function getLogin(req, res) {
    let sessionData = sessionFlash.getSessionData(req);
  
    if (!sessionData) {
      sessionData = {
        email: '',
        password: '',
      };
    }
  
    res.render('customer/auth/login', { inputData: sessionData });
  }

  async function login(req, res, next) {
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try {
      existingUser = await user.getUserWithSameEmail();
    } catch (error) {
      next(error);
      return;
    }
  
    const sessionErrorData = {
      errorMessage:
        'Invalid credentials - please double-check your email and password!',
      email: user.email,
      password: user.password,
    };
  
    if (!existingUser) {
      sessionFlash.flashDataToSession(req, sessionErrorData, function () {
        res.redirect('/login');
      });
      return;
    }
  
    const passwordIsCorrect = await user.comparePassword(
      existingUser.password
    );
  
    if (!passwordIsCorrect) {
      sessionFlash.flashDataToSession(req, sessionErrorData, function () {
        res.redirect('/login');
      });
      return;
    }
  
    authUtil.createUserSession(req, existingUser, function () {
      res.redirect('/');
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