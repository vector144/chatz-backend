const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
    try {

        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization
        if (authHeader && (authHeader.startsWith("Bearer"))) {
            token = authHeader.split(" ")[1]
            jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
                if (err) {
                    res.status(400)
                    console.log(err)
                    throw new Error("Unauthorized")
                }
                req.user = decode.user
                next()
            })

        } else {
            res.status(400)
            throw new Error("Unauthorized token not found")
        }
    } catch (error) {
        // console.log(error)
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = validateToken