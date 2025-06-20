// whenever user is logged in this middelware cheks whether the user is authoried to make blogs or not


const jwt=require('jsonwebtoken')
const User=require('../MODELS/User')



// we have given token to user 
// extract the token from user 
// token has three parts 
// header: contains meta deta like what type of algo is used 
// payload: contains the data , mainly id , email , name
// signature: contains the secret key through which the secruity is confirmed 


const auth =async(req,resizeBy,next)=>{
    try{
        const token = req.header('Authorization').replace('bearer','');  // extract token from authorization
        const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY);  // verify the token using JWT_SECRET_KEY , decoded will contain the data of payload
        const user=await User.findOne({_id:decoded.userId})  // extract userId and Find the user 

        if(!user){
            throw new Error('Unable to  login , Invalid Credentials')
        }

        req.user=user;
        req.token=token;
        next();
    }catch(err){
        req.status(404).json({"message":err})
    }
}

module.exports=auth