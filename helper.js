const jwt = require("jsonwebtoken")

const extractUser = (req) => {
    // Get the token from headers, query parameters, cookies, or wherever it's being sent
    let token = req.headers.authorization;
    token = token.replace("Bearer", "").trim()
    // Check if token is provided
    if (!token) {
        throw new Error({ message: 'Authorization token is required.' });
    }

    // Verify the token
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decodedToken) => {
        if (err) {
            throw new Error("Invalid token")
        }
        return decodedToken.user;

    });
}

module.exports = { extractUser }