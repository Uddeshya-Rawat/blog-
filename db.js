const mongoose=require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{
    dbName:process.env.DB_NAME
})
.then(()=>{
    console.log("db connected")
})
.catch((error)=>{
    console.log(`error:${error}`)
})


