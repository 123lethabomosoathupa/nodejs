"use strict"; // Enforce strict mode for safer JavaScript

// Import HTTP status codes to use descriptive constants instead of numbers
const httpStatus = require("http-status-codes");

// Middleware to log all errors
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Print the full error stack trace for debugging
  next(error); // Pass the error to the next error-handling middleware
};

// Middleware to handle 404 Not Found errors
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404 status code
  res.status(errorCode); // Set HTTP response status to 404
  res.send(`${errorCode} | The page does not exist!`); // Send user-friendly message
};

// Middleware to handle 500 Internal Server errors
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500 status code
  console.log(`ERROR occurred: ${error.stack}`); // Log error stack for debugging
  res.status(errorCode); // Set HTTP response status to 500
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`); 
  // Send user-friendly message
};
