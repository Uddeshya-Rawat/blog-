const mongoose=require('mongoose')

const blogScehma=mongoose.Schema({
    title:{
        type:String,required:true
    },
    blog:{
      type:String,required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports=mongoose.model("Blog",blogScehma);