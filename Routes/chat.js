const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: process.env.frontend,
      methods: ["GET", "POST"]
    }
  });

app.use(cors());
try{
io.on("connection", (socket) => {
    console.log("user connected");

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
    console.log(`Server running on port: ${PORT}`);
});
}
catch(e){
    console.log("port 4001 error",e)
}
