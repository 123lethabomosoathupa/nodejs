"use strict";

// Import the http-status-codes module for readable HTTP status codes
const httpStatus = require("http-status-codes");

/**
 * Middleware to log all errors to the console.
 * This should be placed first in the error-handling chain.
 * @param {Error} error - The error object thrown in the app
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 * @param {Function} next - Function to pass control to next middleware
 */
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Log full stack trace for debugging
  next(error); // Pass error to the next error-handling middleware
};

/**
 * Middleware to handle 404 Not Found errors.
 * Triggered when no matching route is found.
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 */
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`); // Send a friendly message
};

/**
 * Middleware to handle 500 Internal Server Errors.
 * Triggered when an unexpected server error occurs.
 * @param {Error} error - The error object
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 * @param {Function} next - Next middleware function
 */
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500
  console.log(`ERROR occurred: ${error.stack}`); // Log full stack trace
  res.status(errorCode);
  res.send(
    `${errorCode} | Sorry, our application is experiencing a problem!`
  ); // Inform client
};

/*
  SUMMARY:
  1. logErrors: Logs error stack traces and forwards the error to the next handler.
  2. respondNoResourceFound: Handles 404 errors, sending a simple "page not found" message.
  3. respondInternalError: Handles 500 errors, logging the stack and notifying the client.

  These functions are intended to be used in an Express app as error-handling middleware,
  ensuring consistent logging and user-friendly error responses.
*/
