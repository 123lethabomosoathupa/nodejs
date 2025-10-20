"use strict";

/*
=====================================================
🧠 FILE SUMMARY: errorController.js
-----------------------------------------------------
This controller centralizes error handling for the app.

🎯 GOALS:
1. Handle all unhandled or invalid routes (404 errors).
2. Handle unexpected internal server issues (500 errors).
3. Provide clean, user-friendly error responses.
4. Keep main app logic (in app.js or routes) cleaner by 
   separating error-handling concerns.

The two exported functions are:
- pageNotFoundError: For 404 - Page Not Found.
- internalServerError: For 500 - Internal Server Error.
=====================================================
*/

const httpStatus = require("http-status-codes"); // Provides readable HTTP status constants

// --------------------------------------------------
// 404 - Page Not Found Handler
// --------------------------------------------------
// Triggered when no route matches the requested URL.
// Renders an error page with a 404 status.
exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404
  res.status(errorCode);
  res.render("error"); // Render 'error.ejs' (custom view)
};

// --------------------------------------------------
// 500 - Internal Server Error Handler
// --------------------------------------------------
// Triggered when something goes wrong in the server code.
// Logs the stack trace for debugging and sends a friendly message.
exports.internalServerError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500
  console.log(`ERROR occurred: ${error.stack}`); // Log detailed error info
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is taking a nap!`); // Friendly message for the user
};
