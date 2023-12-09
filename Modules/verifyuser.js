const mongoose=require("mongoose");
const{Schema}=mongoose;

const verify=new Schema({
    name:{type:String,
          required:true,},
    email:{type:String,
            required:true,},
    password:{type:String,
                required:true,},
    token:{type:String,otp:String,},
},
{collection:'verify'}
);

module.exports=mongoose.model('verify',verify);