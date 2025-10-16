"use strict";

const httpStatus = require("http-status-codes");
const path = require("path");

// Log any error that occurs
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};

// Custom 404 handler
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status(errorCode);
  res.sendFile(path.join(__dirname, "../public/404.html"));
};

// 500 Internal Server Error handler
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
