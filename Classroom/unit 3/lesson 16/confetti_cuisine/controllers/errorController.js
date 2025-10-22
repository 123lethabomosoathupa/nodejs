"use strict"; // Enforces strict mode for cleaner, safer JavaScript

// === Import HTTP Status Codes ===
const httpStatus = require("http-status-codes"); // Provides easy-to-read HTTP status code constants

// === Middleware to Log Errors ===
// Logs the full error stack to the console for debugging purposes.
// Passes the error to the next error-handling middleware.
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Print detailed error information
  next(error);                // Pass the error to the next middleware
};

// === 404 Error Handler (Resource Not Found) ===
// This middleware handles requests to routes that do not exist.
// Responds with HTTP 404 and a friendly message.
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};

// === 500 Error Handler (Internal Server Error) ===
// Handles unexpected server-side errors.
// Logs the error stack and responds with HTTP 500 and a friendly message.
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500
  console.log(`ERROR occurred: ${error.stack}`);    // Log full stack trace
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
