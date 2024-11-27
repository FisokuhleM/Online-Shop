//add function to create user session
function createUserSession(req,user,action){
    req.session.uid = user._id.toString(); //property available by express-session
    req.session.isAdmin = user.isAdmin; //Add isAdmin Flag to the session
    req.session.save(action);
}

function destroyUserAuthSession(req){
    req.session.uid = null;
}

module.exports = {
    createUserSession : createUserSession,
    destroyUserAuthSession : destroyUserAuthSession
};