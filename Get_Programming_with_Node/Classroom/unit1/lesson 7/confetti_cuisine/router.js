// Import modules
const httpStatus = require("http-status-codes");  // For readable HTTP status codes
const contentTypes = require("./contentTypes");   // Content-Type definitions
const utils = require("./utils");                 // Utility functions (file reading)

// Object to store route handlers, separated by HTTP method
const routes = { "GET": {}, "POST": {} };

/* ------------------ HANDLE REQUEST ------------------ */

// Main request handler
exports.handle = (req, res) => {
  try {
    // Exact-match routing only (no querystring or parameter parsing)
    // Call the function associated with the method and URL
    routes[req.method][req.url](req, res);
  } catch (e) {
    // Fallback: show error page if route not found or any other error occurs
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/error.html", res);
  }
};

/* ------------------ ROUTE REGISTRATION ------------------ */

// Register a new GET route
exports.get = (url, action) => {
  routes["GET"][url] = action;
};

// Register a new POST route
exports.post = (url, action) => {
  routes["POST"][url] = action;
};
