function addCsrfToken(req,res,next){
    res.locals.csrfToken = req.csrfToken();
    next();//Forwards request to next middleware in line
}

module.exports = addCsrfToken;