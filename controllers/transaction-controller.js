const transactionModel = require("../models/transactionModel")
const moment=require('moment')
const getAllTransaction=async(req,res)=>{
    try {
        const{frequency,selectedDate,typeofTrans}=req.body
        const transactions=await transactionModel.find({userid:req.body.userid,
            date:'30',
          ...(frequency!='custom'?{date:{
            $gt:moment().subtract(Number(frequency),'d').toDate(),
          }}:{
            date:{
                $gte:selectedDate[0],
                $lte:selectedDate[1]
          }
          }) , 
          ...(typeofTrans!='all'&&{type:typeofTrans})

        });
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:error
        })
    }
}
const getAllTransactionMonth= async (req,res)=>{
    try {
        const {date}=req.body;
              const startmonth=moment().month(date).startOf('month').toDate();
              const endmonth=moment().month(date).endOf('month').toDate();
        const transaction=await transactionModel.find({userid:req.body.userid,date:{
             $gte:startmonth,
             $lte:endmonth
        }});
        console.log(moment().year(date).endOf('year').toDate());
        
       res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getAllTransactionYearly= async (req,res)=>{
    try {
        const {date,typeofTrans}=req.body;
              const startYear=moment().year(date).startOf('year').toDate()
              const endYear=moment().year(date).endOf('year').toDate();
        const transaction=await transactionModel.find({userid:req.body.userid,date:{
             $gte:startYear,
             $lte:endYear,
        },
        type:typeofTrans,
    });
        console.log(typeofTrans+"mw");
        
        
       res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json(error)
    }
}
const addTransaction=async(req,res)=>{
      try {
        const newTransaction=await transactionModel.create(req.body);
        res.status(201).send("transaction created")
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:error
        })
    }
}
const deleteTransaction=async(req,res)=>{
try {
    const transactionid=req.params.id;
    const deletedtrans=await transactionModel.findByIdAndDelete(transactionid);
    if(!deletedtrans){
        res.status(400).send("id not found")
    }
    res.status(200).json({
        success:true,
        data:deletedtrans
    })
} catch (error) {
    res.status(500).json(error)
}
}
const updateTransaction=async (req,res)=>{
        try {
        const id=req.params.id;
        const updatetrans=await transactionModel.findByIdAndUpdate(id,req.body, {new: true});
        if (!updatetrans) {
            return res.status(404).send("Transaction not found");
        }
        res.status(200).json({
            success:true,
            data:updatetrans
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports={getAllTransaction,addTransaction,getAllTransactionMonth,deleteTransaction,getAllTransactionYearly,updateTransaction}