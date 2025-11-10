"use strict"; // ✅ Enforce strict mode for safer JavaScript execution

// -------------------------
// Import HTTP Status Codes
// -------------------------
const httpStatus = require("http-status-codes"); 
// Provides easy-to-read constants like 404, 500, etc.
// Example: httpStatus.NOT_FOUND → 404

// -----------------------------------------------------------
// 🧾 LOG ERRORS — Middleware to log error details to the console
// -----------------------------------------------------------
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Log the error stack trace to the console
  next(error); // Pass the error to the next middleware (for handling)
};

// -----------------------------------------------------------
// 🚫 404 HANDLER — No resource found (Page not found)
// -----------------------------------------------------------
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404
  res.status(errorCode); // Set status to 404
  res.send(`${errorCode} | The page does not exist!`); // Send plain-text error message
};

// -----------------------------------------------------------
// 💥 500 HANDLER — Internal server error
// -----------------------------------------------------------
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500
  console.log(`ERROR occurred: ${error.stack}`); // Log detailed error info
  res.status(errorCode); // Set status to 500
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`); // Send response to client
};
