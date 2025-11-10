"use strict";

// Import the http-status-codes module for readable HTTP status codes
const httpStatus = require("http-status-codes");

/**
 * Middleware to log all errors to the console.
 * This should be the first error-handling middleware.
 * @param {Error} error - The error object
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 * @param {Function} next - The next middleware function
 */
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Print the stack trace for debugging
  next(error); // Pass the error to the next error-handling middleware
};

/**
 * Middleware to handle 404 Not Found errors.
 * Triggered when a requested route does not exist.
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 */
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`); // Send 404 message to client
};

/**
 * Middleware to handle 500 Internal Server errors.
 * Triggered when an unexpected server error occurs.
 * @param {Error} error - The error object
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 * @param {Function} next - The next middleware function
 */
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500
  console.log(`ERROR occurred: ${error.stack}`); // Log full stack trace
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`); // Inform client
};

/*
  SUMMARY:
  1. logErrors: Logs error stack traces to the console and passes the error to the next handler.
  2. respondNoResourceFound: Handles 404 errors when a route is not found, sending a simple message.
  3. respondInternalError: Handles 500 errors, logging the stack trace and notifying the client.

  These functions are designed to be used as Express error-handling middleware,
  ensuring that all errors are logged and appropriate responses are sent to the client.
*/
