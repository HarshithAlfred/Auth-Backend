const express=require("express")
const router =express.Router()
const {sendMail} =require('../controllers/Sendmail')
const bcrypt =require("bcrypt")
const dotenv =require("dotenv")
const { passcheckuser, generatetoken} =require('../controllers/signin.js')
const jwt =require("jsonwebtoken")
const User =require("../Modules/User.js")
dotenv.config()
let storage={}
router.post('/',async (req,res)=>{

    try{
      
      const {email,password}=await req.body
      const check= await User.findOne({email:email});
      if(check){
      const salt =await bcrypt.genSalt(10)
     const hashpassword=await bcrypt.hash(password,salt)
      storage[0]=hashpassword
      const token=generatetoken(email)
      console.log(token)
     const Link=`${process.env.backend}/changepass/${token}`
      const content=` 
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .head{
            background:linear-gradient(-340deg, yellow 0%,red);
            font-size: 40px;
            background-clip: text;
            color:transparent;
            padding:0;
            margin: 0;
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
        <h1>Password Reset</h1>
        <h1>Hey ${check.name},</h1> <p>We received a request to reset the password associated with your account. If you did not initiate this request, please disregard this email, and consider reviewing the security of your account.</p>
        <p>If you did request a password reset, please click on the following link to set a new password:</p>
        <a href="${Link}">Reset Your Password</a>
        <p>Please note that this link is valid for a limited time for security reasons. If you don't complete the password reset , you will need to submit another password reset request.</p>
        <p>For security purposes, it's important to choose a strong password. Make sure your new password is unique and not easily guessable. It should include a combination of upper and lowercase letters, numbers, and special characters.</p>
        <p>If you encounter any issues or have further questions, feel free to contact our support team at same address.</p>
        <p>Thank you for your attention to this matter.</p>
        <p>Best regards,</p>
        <h1 class='head'>Chatz</h1>
    </div>
</body>
</html>`      
     
      sendMail(email,"Forgotten Password Resetting",content)
      
    }
   else{res.status(400).send("usernot found")}}
    catch(e){console.log(e)}
  });

router.get("/:token",async (req,res)=>{
    try{const pass = storage[0]
        const response = await passcheckuser(req.params.token,pass)
        res.status(200).send(response)}
   catch(e){
    res.status(200).send(`<html><body><h2>Hey passwor resetting failed</h2><p>unexpected error happened try again .................</p> <p>thank you have a nice day</p></body></html>`);
    console.log(e)}
})
module.exports=router;