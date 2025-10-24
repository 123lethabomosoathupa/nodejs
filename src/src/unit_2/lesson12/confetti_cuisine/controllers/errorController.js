"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Import HTTP Status Codes ===
const httpStatus = require("http-status-codes"); // Provides constants like NOT_FOUND (404) and INTERNAL_SERVER_ERROR (500)

// === 404 Error Handler (Page Not Found) ===
// Handles requests to routes that do not exist.
// Responds with HTTP 404 and renders a friendly error page.
exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404
  res.status(errorCode);
  // Render a custom error view (error.ejs) instead of sending plain text
  res.render("error");
};

// === 500 Error Handler (Internal Server Error) ===
// Handles unexpected server-side errors.
// Logs the error stack and responds with a friendly message.
exports.internalServerError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500
  console.log(`ERROR occurred: ${error.stack}`);    // Log detailed error info for debugging
  res.status(errorCode);
  // Send a friendly error message to the client
  res.send(`${errorCode} | Sorry, our application is taking a nap!`);
};
