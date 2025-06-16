const mongoose=require('mongoose')
const bcrypt=require('bcrypt')



// create user schema to store data in mongodb
const userSchema=new mongoose.Schema({
    userName:{
        type:String,required:true
    },
    email:{
        type:String,required:true
    },
    password:{
        type:String,required:true
    },
    otp:{
        type:Number   
    }
})


// mongooose has event too 
// in this event what we want is that before storing the password we should bycrypt the password
// it is middleware 

userSchema.pre('save',async function (next){
     const user=this;  //this refers to the current user document that is about to be saved.
     if(!user.isModified('password')) return next(); // if password is modified then go  to next middelware

     user.password = await bcrypt.hash(user.password,8)  // mix the password with salt 
    next();

})

const User=mongoose.model("User",userSchema)
module.exports=User