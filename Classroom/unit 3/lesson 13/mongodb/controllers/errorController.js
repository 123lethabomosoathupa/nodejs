/*
========================================
 errorController.js
----------------------------------------
 SUMMARY:
 This controller manages error handling for the Express application.
 It includes:
   - Logging all server errors to the console
   - Responding with a custom 404 "Not Found" page
   - Responding with a 500 "Internal Server Error" message
========================================
*/

"use strict"; // Enforces strict mode for cleaner, safer JavaScript

// Import HTTP status codes and utilities for consistent responses
const httpStatus = require("http-status-codes");

// Import path module to work with file paths
const path = require("path");

// === ERROR HANDLING MIDDLEWARE FUNCTIONS ===

// Logs any error that occurs in the application
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Print detailed error stack trace
  next(error); // Pass the error to the next error handler
};

// Handles requests for resources that do not exist (404)
exports.respondNoResourceFound = (req, res) => {
  // Set status code to 404: Not Found
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status(errorCode);

  // Send a custom 404 HTML page from the "public" directory
  res.sendFile(path.join(__dirname, "../public/404.html"));
};

// Handles server errors (500)
exports.respondInternalError = (error, req, res, next) => {
  // Set status code to 500: Internal Server Error
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;

  // Log error details to the console for debugging
  console.log(`ERROR occurred: ${error.stack}`);

  // Send a simple error message response to the client
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
