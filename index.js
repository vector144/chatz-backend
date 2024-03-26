const env = require('dotenv').config()
const express = require("express")
const errorHandler = require("./middleWare/errorHandler")
const connectDb = require('./config/dbconnect')
const app = express()
const cors = require('cors');
connectDb()
const port = process.env.PORT
var server = require("http").Server(app);
// const io = require("socket.io")(server);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
      "Access-Control-Allow-Credentials":true,
      methods: ["GET", "POST"],
      credentials: true 
    }
  });
  


app.use(express.json())
app.use(cors());

io.on("connection", function (client) {
    console.log("connection has made")
})
// app.use('/api/contacts', require("./routes/contactRoutes"))
app.use('/api/auth', require("./routes/userRoutes"))
app.use('/api/message', require("./routes/messageRoutes"))
app.use(errorHandler)
server.listen(port, () => {
    console.log("port is started on", port)
})
