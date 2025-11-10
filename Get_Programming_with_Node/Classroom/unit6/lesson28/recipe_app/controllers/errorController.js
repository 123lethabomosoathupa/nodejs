"use strict"; 
// Enforce strict mode for safer JavaScript coding

const httpStatus = require("http-status-codes"); 
// Import standardized HTTP status codes for consistent error responses

// Middleware to log errors to the console
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Print the full stack trace of the error
  next(error); // Pass the error to the next error-handling middleware
};

// Middleware to handle 404 Not Found errors
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // HTTP 404
  res.status(errorCode); // Set response status to 404
  res.send(`${errorCode} | The page does not exist!`); // Send message to client
};

// Middleware to handle 500 Internal Server errors
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // HTTP 500
  console.log(`ERROR occurred: ${error.stack}`); // Log full error stack to console
  res.status(errorCode); // Set response status to 500
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`); 
  // Send user-friendly error message to client
};
