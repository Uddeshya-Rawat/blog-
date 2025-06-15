const express = require('express')
const router =express.Router()
const jwt =require('jsonwebtoken');
const bcrypt=require("bcrypt")
const User=require("../MODELS/User")



router.post('/register', async (req,res)=>{
    try{
        const {userName,email,password}=req.body;
        const preUser =await User.findOne({email}); // find in data base in the User document
        if(preUser){
            return res.json({
                message:"email already exist "
            })
        }
        const user = new User({userName,password,email});
        await user.save()
        res.json({
            message:"User created Successfully"
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

router.post('/login', async (req,res)=>{
    try{
        const {email,password}=req.body;  //  destructure
        const user =await User.findOne({email}); // find in data base in the User document
        if(!user){
            return res.status(400).json({
                message:'User not found'
            })
        }

        const isMatch=await bcrypt.compare(password,user.password) // compare the password
        if(!isMatch){
            return res.status(400).json({
                message:"wrong password "
            })
        }

        const token = jwt.sign({  // create token
            userId:user._id
        },process.env.JWT_SECRET_KEY)

         res.json({
            token , user , message:"user logged in successfullly"
         })

        
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


module.exports=router