"use strict";

const httpStatus = require("http-status-codes");

// Log errors to console
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};

// Respond when a route isn't found
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};

// Respond when a server error occurs
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
