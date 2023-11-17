const express=require('express')
const {config}=require('../config/Config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const router = express.Router();
const User=require('../model/User');

const Register=async (userName,passWord)=>{
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(passWord,salt);
    let user=new User({
        username:userName,
        password:hashPassword
    })
    return user.save();
}

const Login=async (userName,passWord)=>{
    const filter={
        username:userName
    };
    const user=await User.findOne(filter);
    if(user){
        const validPass=await bcrypt.compare(passWord,user.password);
        if(validPass){
            return user;
        }
        else {
            throw Error("invalid username or password")
        }

    }
    throw Error("invalid username or password")
}

const getUserById =(userId)=>{
    return {
        userId:userId,
        name : "Some data from DB"
    }
};
module.exports = {
    Register,
    Login,
    getUserById
}