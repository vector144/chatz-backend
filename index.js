const env = require('dotenv').config()
const express = require("express")
const errorHandler = require("./middleWare/errorHandler")
const connectDb = require('./config/dbconnect')
const app = express()
connectDb()
const port = process.env.PORT

app.use(express.json())
// app.use('/api/contacts', require("./routes/contactRoutes"))
app.use('/api', require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port, () => {
    console.log("port is started on", port)
})
