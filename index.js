const express=require("express");
const connectDB =require("./db");
const cors =require("cors")
const Signinroute=require("./Routes/Signin.js");
const login=require("./Routes/login.js");
const home=require("./Routes/home.js")
const chanegapss =require("./Routes/changepass.js")
const chat=require("./Routes/chat.js")
const app=express();
app.use(express.json());
app.use(cors({origin:"*"}));
const port=4000;
connectDB();

app.get("/",(req,res)=>{res.send("hello palav")});
app.listen(port,(req,res)=>{console.log(`Server listening on ${port}`)});
app.use('/signin',Signinroute);
app.use('/login',login);
app.use('/home',home);
app.use('/changepass',chanegapss);
//app.use('/chat',chat)