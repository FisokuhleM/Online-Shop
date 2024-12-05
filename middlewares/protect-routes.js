function protectRoutes(req,res,next){
    if(!res.locals.isAuth){
        return res.redirect('/401'); //401 --> Unauthenticated Access!
    }

    if(req.path.startsWith('/admin')&& !res.locals.isAdmin){
        return res.redirect('/403'); //Unauthotized access
    }
    next();
}

module.exports = protectRoutes;