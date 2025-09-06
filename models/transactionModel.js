const mongoose=require('mongoose');
 const transactionSchema=mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:[true,'amount is required'],


    },
    type:{
        type:String,
        required:[true,"type is required "]
    },
    category:{
        type:String,
        required:[true,"category is required"]
    },
    refrence:{
        type:String,
    },
    description:{
        type:String,
        required:[true,"desc is required"]
    },
    date:{
        type:Date,
        required:[true,"date is required"]
    }
 })
 module.exports=mongoose.model('transaction',transactionSchema)