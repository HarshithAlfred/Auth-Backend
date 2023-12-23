const express=require("express");
const connectDB =require("./db");
const cors =require("cors")
const Signinroute=require("./Routes/Signin.js");
const login=require("./Routes/login.js");
const home=require("./Routes/home.js")
const chanegapss =require("./Routes/changepass.js")
const chat=require("./Routes/chat.js")
const app=express();
const dotenv= require("dotenv")
dotenv.config()
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
app.use(express.json());
app.use(cors({origin:process.env.frontend}));
const port=4000;
connectDB();

app.get("/",(req,res)=>{res.send("hello palav")});
app.listen(port,(req,res)=>{console.log(`Server listening on ${port}`)});
app.use('/signin',Signinroute);
app.use('/login',login);
app.use('/home',home);
app.use('/changepass',chanegapss);
//app.use('/chat',chat)

const io = new Server(server,{
    path: '/socket.io',
    cors: {
      origin: process.env.frontend,
      methods: ["GET", "POST"]
    }
  });
try{
io.on("connection", (socket) => {
    console.log("user connected");
    console.log("inside",socket);
    socket.on('chat message', (data) => {
        console.log(`message from : ${data.name} : ${data.message}`);
        io.emit("chat message", data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

const PORT =4001;
server.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
}
catch(e){
    console.log("port 4001 error",e)
}
