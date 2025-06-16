const express = require('express')
const router =express.Router()
const jwt =require('jsonwebtoken');
const bcrypt=require("bcrypt")
const User=require("../MODELS/User")
const nodemailer=require('nodemailer')
require('dotenv').config();



// define who is the owner for sending  otp for forgot password
const transporter=nodemailer.createTransport({
       service:"gmail",
       auth:{
        user:process.env.Email,
        pass:process.env.Password
       }
})




//  register
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



// login authenticate 
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


// send otp route
router.post('/sendOTP',async(req,res)=>{
    const {email}=req.body
    const otp=Math.floor(100000+Math.random()*900000);
    try{  // initialize message
        const mailOptions={  
            from:process.env.Email,
            to:email,
            subject:"OTP for verification",
            text:`Your OTP for Verification is ${otp}`
        }

// send 
     transporter.sendMail(mailOptions,async(err,info)=>{
        if(err){
            res.status(500).json({
                message:err.message
            })
        }else{
            res.json({
                message:'OTP sent successfully'
            })
        }
     })

    }catch(error){
      res.json({
                message:'not working'
            })
    }
})


module.exports=router