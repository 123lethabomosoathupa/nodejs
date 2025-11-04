"use strict"; // Enforce strict mode for safer JavaScript

// Import HTTP status codes for readable constants
const httpStatus = require("http-status-codes");

// Middleware to log all errors
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Print full error stack to console
  next(error); // Forward error to next error-handling middleware
};

// Middleware to handle 404 Not Found errors
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404 status code
  res.status(errorCode); // Set HTTP response status
  res.send(`${errorCode} | The page does not exist!`); // Send user-friendly message
};

// Middleware to handle 500 Internal Server errors
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500 status code
  console.log(`ERROR occurred: ${error.stack}`); // Log the full error stack
  res.status(errorCode); // Set HTTP response status
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`); // Send user-friendly message
};
