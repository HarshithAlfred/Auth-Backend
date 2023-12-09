const User= require("../Modules/User.js");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");
const client=require("../redis.js")
dotenv.config();
async function checkuser(email){
 try{
   const user=await User.findOne({email: email});
   if(user){
    return true;
   }
   return false;
 }
 catch(e){
    console.log("server busy",e);
 }
};
async function Authenticateuser(email,password){
  try{
    const usercheck=await User.findOne({email,email})
    const validpassword=await bcrypt.compare(password,usercheck.password);
    if(validpassword){
      const token=jwt.sign({email},process.env.login_secret_token);
      const response={
        id:usercheck._id,
        name:usercheck.name,
        email:usercheck.email,
        token:token,
        status:true,
      };
     await client.set(`key-${email}`,JSON.stringify(response))
     await User.findOneAndUpdate({email:usercheck.email},{$set:{token:token}},{new:true});
     return response
    }
    return "Invalid user and password"
  }
  catch(e){console.log(e)
  return "Server busy"
}
}
async function Authorisation(token){
  try{
    const decodedtoken=jwt.verify(token,process.env.login_secret_token)
    if(decodedtoken){
      const email=decodedtoken.email;
      const auth=await client.get(`key-${email}`)
      if(auth){
        const data=JSON.parse(auth)
        return data
      } else{
        const data=await User.findOne({email:email})
        return data
      }
    }
    return false;
  }
  catch(e){console.log(e);
  return "Server busy"}
};
module.exports= {Authorisation,checkuser,Authenticateuser};