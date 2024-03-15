const express = require("express")
require('dotenv').config
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const signup=express.Router();
const userModel=require('../model/User.model')
const login = express.Router()

signup.post('/signup',async(req,res)=>{
    try{
        const hashedPassword=await bcrypt.hash(req.body.Password,10)
        const newUser={
            Name:req.body.Name,
            Password: hashedPassword
        }
        await userModel.create(newUser)
        const accessToken=jwt.sign(hashedPassword,process.env.ACCESS_TOKEN_SECRET)
        res.status(201).json({message:"Signup Successful",accessToken:accessToken})
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

login.post('/login',async (req, res) => {
    const user = await userModel.findOne({Name:req.body.Name});
   if(user==null){
    return res.status(400).send('Cannot find user');
   }
   try{
    if(await bcrypt.compare(req.body.Password,user.Password)){
        const accessToken = jwt.sign(user.Password,process.env.ACCESS_TOKEN_SECRET )
        res.json( {accessToken: accessToken})
    }else{
        res.send('Wrong Password')
    }
   }catch(err){
    res.status(500).json(user);
    console.log(user)
   }
})
module.exports = {login,signup}