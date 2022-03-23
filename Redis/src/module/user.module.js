const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:false},
    age:{type:Number,required:true}
})

const User=mongoose.model("user",userSchema);

module.exports=User;