"use strict";

const httpStatus = require("http-status-codes");

// Log all errors to the console for debugging
exports.logErrors = (error, req, res, next) => {
  console.error("🔥 ERROR:", error.stack);
  next(error);
};

// Handle 404 Not Found
exports.respondNoResourceFound = (req, res) => {
  const errorCode = httpStatus.StatusCodes.NOT_FOUND; // ✅ updated syntax
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};

// Handle 500 Internal Server Error
exports.respondInternalError = (error, req, res, next) => {
  const errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR; // ✅ updated syntax
  console.error(`💥 ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
