const User = require("../modals/userModal")
const bcyrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const register = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body
    if (!userName || !email || !password) {
        res.status(400)
        throw new Error("all feilds are medatory")
    }
    const availableUser = await User.findOne({ email })
    if (availableUser) {
        res.status(400)
        throw new Error("user Already registred")
    }
    const hashedPassword = await bcyrpt.hash(password, 10)
    const user = await User.create({
        userName, email, password: hashedPassword
    })
    if (!user) {
        res.status(400)
        throw new Error("user not created")
    }
    res.status(201).json({
        _id: user.id,
        email: user.email
    })
})
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("all feilds are medatory")
    }
    const user = await User.findOne({
        email
    })
    if (user && (await bcyrpt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: "15m"
        })
        res.status(200).json({
            accessToken
        })

    } else {
        res.status(400)
        throw new Error("Email Or Password is Invalid")

    }

    res.status(200).json(user)
})

const currentUser = asyncHandler((req, res) => {
    res.status(200).json(req.user)
})
module.exports = { register, login, currentUser }