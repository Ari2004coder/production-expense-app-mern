const mongoose=require('mongoose');
//schema design
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required and should be unique'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[6,'minumum length must be 6']
    },
    

},{timestamp:true})
module.exports=mongoose.model("Users",userSchema)