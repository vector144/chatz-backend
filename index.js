const env = require('dotenv').config()
const express = require("express")
const errorHandler = require("./middleWare/errorHandler")
const connectDb = require('./config/dbconnect')
const cors = require('cors');
const { app, server } = require('./socket/socket');
connectDb()
const port = process.env.PORT

app.use(express.json())
app.use(cors());


app.use('/api/auth', require("./routes/userRoutes"))
app.use('/api/message', require("./routes/messageRoutes"))
app.use(errorHandler)
server.listen(port, () => {
    console.log("port is started on", port)
})
