const httpStatus = require("http-status-codes");
const path = require("path");
exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
};
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(path.join(__dirname, "../public/404.html"));
};
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};