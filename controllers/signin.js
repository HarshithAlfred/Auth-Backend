const brypt=require("bcrypt");
const dotenv=require("dotenv");
dotenv.config();
const User=require("../Modules/User.js");
const {sendMail}=require("../controllers/Sendmail.js");
const mongoose=require("mongoose");
const verifyuser = require("../Modules/verifyuser.js");
const jwt=require("jsonwebtoken");

async function inersetVerifyuser(email,name,password){
 try{
    const salt=await brypt.genSalt(10);
    const hashpassword= await brypt.hash(password,salt);
    const token=generatetoken(email);
    
    const newUser =new verifyuser({name:name,email:email,password:hashpassword,token:token});
    console.log(newUser);
    const activationlink=`http://localhost:4000/signin/${token}`
    const content=`<h2>Hey hi welcome to our Registration page</h2><p>thank you for signing up click <br> on the below link to activate </p>
    <a href=${activationlink}>click here</a> <p>thank you have a nice day</p>`

await newUser.save();
sendMail(email,"Verify User Link",content);
 }

 catch(e){
    console.log(e);
 }
};
function generatetoken(email){
    const token=jwt.sign(email,process.env.sign_up_secret_token)
    return token;
}

async function inertSignipuser(token){
    try{
      const userverify =await verifyuser.findOne({token: token}); 
      if(userverify){
        const newUser =new User({
            name:userverify.name,
            email:userverify.email,
            password:userverify.password,
            token:userverify.token,
            forgetpassword:{}
        });
        const link="http://localhost:5173/login"
        await newUser.save();
        await userverify.deleteOne();
        console.log("deleted aithu");
        const content=`<h2>Hey Registration sucess</h2><p>just login and check the new updates <br> <a href= "${link}">Click here </a> to move on  </p> <p>thank you have a nice day</p>`
        sendMail(newUser.email,"verification Sucessfull",content);
        return `<h2>Hey Registration sucess</h2><p>just login and check the new updates <br> <a href= "${link}">Click here </a> to move on  </p> <p>thank you have a nice day</p>`
      }
      return `<h2>Hey Registration faild</h2><p>just try again losser..................</p> <p>thank you have a bad day</p>`
      
    }
    catch(error){
        console.log(error);
        return  `<html><body><h2>Hey Registration faild</h2><p>unexpected error happened try again losser..................</p> <p>thank you have a bad day</p></body></html>`
    }
}
module.exports={inersetVerifyuser,inertSignipuser}




