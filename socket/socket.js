const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    "Access-Control-Allow-Credentials": true,
    methods: ["GET", "POST"],
    credentials: true
  }
})

io.on("connection", (socket) => {
  console.log("a user  has connected", socket.id)
})
module.exports = { io, app, server };