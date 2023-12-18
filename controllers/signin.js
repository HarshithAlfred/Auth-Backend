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
    const activationlink=`https://auth-backend-6dn1.onrender.com/signin/${token}`
    //const activationlink=`http://localhost:4000/signin/${token}`
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
async function passcheckuser(token,pass){
   try{ const checkuser= await User.findOne({forgetpassword:token});
    
   if(checkuser){
     checkuser.password=pass;
     await checkuser.save();
     console.log("password changed")
     return `<!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Password Changed Successfully</title>
         <style>
             body {
                 font-family: 'Arial', sans-serif;
                 background-color: #f4f4f4;
                 margin: 0;
                 padding: 0;
             }
             .container {
                 max-width: 600px;
                 margin: 50px auto;
                 background-color: #ffffff;
                 padding: 20px;
                 border-radius: 8px;
                 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
             }
             h1 {
                 color: #333333;
             }
             p {
                 color: #555555;
             }
             a {
                 color: #007BFF;
                 text-decoration: none;
                 font-weight: bold;
             }
             a:hover {
                 text-decoration: underline;
             }
         </style>
     </head>
     <body>
         <div class="container">
             <h1>Password Changed Successfully</h1>
             <p>Hey, your password has been successfully changed. If you did not initiate this change, please contact us immediately.</p>
             <p>Try logging in with your new password.</p>
             <p>Thank you and have a nice day!</p>
         </div>
     </body>
     </html>
     `
   }
   else{console.log("password didn`t changed")}
   return `<h2>Hey password reset  faild</h2><p>just try again ..................</p> <p>thank you have nice day</p>`
} catch(e){console.log(e)}
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
            forgetpassword:userverify.token
        });
        
        await newUser.save();
        await userverify.deleteOne();
        console.log("deleted aithu");
        const content=`<h2>Hey Registration Success</h2><p>just login and check the new updates  </p> <p>thank you have a nice day</p>`
        sendMail(newUser.email,"verification Sucessfull",content);
        return `<h2>Hey Registration Success</h2><p>just login and check the new updates  </p> <p>thank you have a nice day</p>`
      }
      return `<h2>Hey Registration Failed</h2><p>just try again ..................</p> <p>thank you have nice day</p>`
      
    }
    catch(error){
        console.log(error);
        return  `<html><body><h2>Hey Registration Failed</h2><p>unexpected error happened try again ..................</p> <p>thank you have a nice day</p></body></html>`
    }
}
module.exports={inersetVerifyuser,inertSignipuser,generatetoken,passcheckuser}




