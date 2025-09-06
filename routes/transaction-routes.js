const express=require('express');
const { loginController, registerController } = require('../controllers/user-controller');
const { addTransaction, getAllTransaction, getAllTransactionMonth, deleteTransaction, getAllTransactionYearly, updateTransaction} = require('../controllers/transaction-controller');
const router=express();

//routers
//Transaction
router.post('/add-transaction',addTransaction)
router.post('/get-transaction',getAllTransaction)
router.post('/get-transactionmonth',getAllTransactionMonth);
router.post('/get-transactionyearly',getAllTransactionYearly)
router.delete('/delete/:id',deleteTransaction)
router.put('/update/:id',updateTransaction)

module.exports=router