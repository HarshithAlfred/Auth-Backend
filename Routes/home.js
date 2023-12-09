const express=require("express");
const { Authorisation}  = require("../controllers/login.js");
const router=express.Router();

router.get('/',async (req,res)=>{
    try{const token= await req.headers.authorization;
        const login_credentials = await Authorisation(token);
     if(login_credentials === false){
        res.status(200).send("Invalid token");
     }else{
        res.json(login_credentials)
     }}
    catch(e){console.log(e)
    res.status(400).send("server busy")}
})

module.exports=router;