const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(res.statusCode)
    res.status(statusCode)
    switch (statusCode) {
        case 401:
            res.json({
                title: "UnAuthorised",
                message: err.message,
                stackRace:err.stack
            })
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: err.message,
                stackRace:err.stack

            })
            break;
        case 400:
            res.json({
                title: "Validation Error",
                message: err.message,
                stackRace:err.stack

            })
            break;
        case 500:
            res.json({
                title: "Server Error",
                stackRace:err.stack,
                message: err.message
            })
            break;
        default:
            break;
    }
}
module.exports = errorHandler