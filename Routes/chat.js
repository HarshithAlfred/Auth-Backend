const express=require("express")
const http =require("http")
const dotenv=require("dotenv")
dotenv.config()
const socket=require("socket.io")
const cors=require("cors")
const app=express()
const server=http.createServer(app)
try{
const io= socket(server,{
    cors: {
        origin: process.env.frontend ,
        methods: ["GET", "POST"]
      }
});
app.use(cors());
io.on("connection",(socket)=>{
    console.log("user connected")
    socket.on('chat message',(data)=>{
        console.log(`message from : ${data.name} : ${data.message}`)
    io.emit("chat message",data)
    });
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    });
});}
catch(e){
    console.log("port 4000 error",e)
}
server.listen(4001,()=>{console.log("Server running on port:4001")});
