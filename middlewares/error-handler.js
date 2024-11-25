//Handling errors
function handleErrors(error,req,res,next){
    console.log(error);
    res.status(500).render('shared/500'); //500---> Server-side error

}

module.exports = handleErrors;