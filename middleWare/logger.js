const path = require("path");

function log(req,res,next){
    console.log('this is log 1 function',req.path);
    next();
}

function auth(req,res,next){
    console.log('this is log 2 function',req.path);
    if (req.path.startsWith('/admin')){
        res.status(401).json({
            message:"unauthorized"
        })
    }
    else next();
}

module.exports = {
    log,
    auth
}