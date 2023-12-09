const express=require("express");
const router=express.Router();
const {checkuser} =require("../controllers/login.js");
const {inersetVerifyuser,inertSignipuser} =require("../controllers/signin.js");

router.get('/:token',async (req,res)=>{
  try{
    const response = await inertSignipuser(req.params.token);
     res.status(200).send(response)}
    
  catch(e){
    res.status(200).send(`<html><body><h2>Hey Registration faild</h2><p>unexpected error happened try again losser..................</p> <p>thank you have a bad day</p></body></html>`);
    console.log(e)}
});
router.post('/verify',async (req,res)=>{
 const {name,email,password}=await req.body;
 const registerCredentials= await checkuser(email);
 
  try{
    if(registerCredentials ===false){
      await inersetVerifyuser(email,name,password)
      res.status(200).send(true)
    }
    else if(registerCredentials ===true){
        console.log("your can login instead of signing in again");
        res.status(200).send(false);
    }
    else if(registerCredentials ==="server busy"){res.status(500).send("server busy")}
  }
  catch(e){console.log(e)}
  
  
});


module.exports=router;
