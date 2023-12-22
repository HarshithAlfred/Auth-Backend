const { createClient } =require('redis');
const dotenv=require("dotenv")
dotenv.config();


const client = createClient({
    //url:process.env.redis_url,
});

client.on("connect",()=>{
    console.log("Connected to Redis");
})
client.on("error",(error)=>{
    console.log("idralli........",error);
})
client.on("end",()=>{
    console.log("redis connection ended");
})
client.on("SIGQUIT",()=>{
    client.quit();
})

module.exports=client;