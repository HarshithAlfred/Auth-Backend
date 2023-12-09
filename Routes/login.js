const express=require("express");
const router =express.Router();
const {Authenticateuser}=require("../controllers/login.js")
const client=require("../redis.js");
client
  .connect()
  .then(()=>{
    console.log("connected to redis")
  })
  .catch((e)=>{
    console.log(e);
  })
router.post('/',async (req,res)=>{
    try{
        const {email,password}=await req.body;
           const loginCredentials= await Authenticateuser(email,password);
           console.log(loginCredentials);
           if(loginCredentials === "Invalid user and password"){
            res.status(200).send("Invalid user and password")
           }
           else if(loginCredentials=== "Server busy"){
            res.status(200).send("Server busy");
           }
           else {
            res.status(200).json({token:loginCredentials.token});

           }
    }
    catch(e){
        console.log(e);
    }
});

module.exports=router