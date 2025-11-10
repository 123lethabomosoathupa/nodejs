"use strict";

/**
 * Middleware to log every incoming request URL.
 * Useful for debugging and tracking user requests.
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 * @param {Function} next - The next middleware function
 */
exports.logRequestPaths = (req, res, next) => {
  console.log(`Request made to: ${req.url}`); // Log the requested URL to the console
  next(); // Pass control to the next middleware or route handler
};

/**
 * Route handler to respond with a dynamic vegetable page.
 * Uses URL parameters to determine which vegetable page to show.
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 */
exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable; // Get the "vegetable" parameter from the URL
  res.send(`This is the page for ${veg}`); // Send a dynamic response
};

/**
 * Route handler to render the homepage.
 * Uses EJS to render the 'index' view.
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 */
exports.respondWithName = (req, res) => {
  res.render("index"); // Render the EJS template 'index.ejs'
};

/*
  SUMMARY:
  1. logRequestPaths: Middleware that logs every incoming request URL for debugging.
  2. sendReqParam: Handles dynamic GET requests using URL parameters and responds with a message.
  3. respondWithName: Renders the homepage using an EJS template.

  These functions are intended to be used in an Express app as route handlers or middleware.
*/
