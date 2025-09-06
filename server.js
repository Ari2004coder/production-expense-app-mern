const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const colors=require('colors')
const connectDB = require('./config/connectDB');
const path=require('path')
//config dotenv file
dotenv.config();
//db connection
connectDB();

//rest object
const app=express();


//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors());
 

//routes
//user routes
app.use('/api/v1/user',require('./routes/user-routes'))

//transaction routes
app.use('/api/v1/transactions',require('./routes/transaction-routes'))



//static files
app.use(express.static(path.join(__dirname,'./client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})

//port
const PORT=8000||process.env.PORT;

//listen server 
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})




