const express=require("express");
const connectDB =require("./db");
const cors =require("cors")
const Signinroute=require("./Routes/Signin.js");
const login=require("./Routes/login.js");
const home=require("./Routes/home.js")
const chanegapss =require("./Routes/changepass.js")
const app=express();
const dotenv= require("dotenv")
dotenv.config()
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