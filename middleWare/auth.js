const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config=require('../config/Config');

const verifyUserToken=(req,res,next)=>{

    let token=req.headers.authorization;
    if(!token) res.status(401).send("unauthorized request");

    try{
        token = token.split(' ')[1];
    if(token===null||!token) res.status(401).send("unauthorized token");
    let verifiedUser= jwt.verify(token,config.config.TOKEN_SECRET);
    if(!verifiedUser) res.status(401).send("unauthorized request");

    req.user=verifiedUser;
    next();

    }
    catch (e) {
        res.status(401).send("invalid token");
    }

}

module.exports = {
    verifyUserToken
};