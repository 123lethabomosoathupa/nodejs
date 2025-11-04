"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// Import standard HTTP status codes for better readability (e.g., 404, 500)
const httpStatus = require("http-status-codes");

// ----------------------------
// ✅ ERROR LOGGING MIDDLEWARE
// ----------------------------
exports.logErrors = (error, req, res, next) => {
  // Logs full error stack trace to the console
  console.error(error.stack);
  // Pass the error to the next middleware in the chain
  next(error);
};

// ----------------------------
// ✅ 404 HANDLER – RESOURCE NOT FOUND
// ----------------------------
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404
  res.status(errorCode); // Set response status to 404
  // Send a plain-text message to the client
  res.send(`${errorCode} | The page does not exist!`);
};

// ----------------------------
// ✅ 500 HANDLER – INTERNAL SERVER ERROR
// ----------------------------
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500
  // Log the error message and stack trace to help debugging
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode); // Set HTTP status code to 500
  // Send an error message to the client
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
