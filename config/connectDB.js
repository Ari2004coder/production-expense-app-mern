const mongoose=require('mongoose');
const color=require('colors');
const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`server running on ${mongoose.connection.host}`.bgCyan.white);
        
    } catch (error) {
        console.log(`db connection fail due to ${error}`.bgRed);
        
    }
}
module.exports=connectDB