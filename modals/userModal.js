const mongoose = require("mongoose")

const User = mongoose.Schema({

    userName: {
        type: String,
        required: [true, "UserName is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    }, password: {
        type: String,
        required: [true, "password is required"]
    }
}, { timestamps: true })
module.exports = mongoose.model("User", User)