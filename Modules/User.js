const mongoose=require("mongoose");
const{Schema}=mongoose;
const User=new Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true,unique:true,},
    password:{type:String,required:true,},
    joinedon:{type:Date,default:Date.now()},
    token:{type:String,required:true,},
    forgetpassword:{type:String,required:true,},
},
{collection:'User'});
module.exports= mongoose.model('User',User);
