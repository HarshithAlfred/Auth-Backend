const mongoose =require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.Mongodb_url);
       console.log("Connect to Mongodb");
    }
    catch(e){
        console.log(e);
    }
}
module.exports= connectDB;