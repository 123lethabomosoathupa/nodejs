// Import HTTP status codes constants
const httpStatus = require("http-status-codes");

// Import content types (likely an object with MIME types)
const contentTypes = require("./contentTypes");

// Import utility functions (e.g., file reading)
const utils = require("./utils");

// Define route tables for GET and POST requests
const routes = { "GET": {}, "POST": {} };

// --- Handle incoming requests ---
exports.handle = (req, res) => {
  try {
    // Exact-match routing only (no query string or dynamic param parsing)
    // Look up the requested method and URL in the routes table
    routes[req.method][req.url](req, res);
  } catch (e) {
    // Fallback if route not found or error occurs
    res.writeHead(httpStatus.OK, contentTypes.html); // Respond with 200 OK and HTML content type
    utils.getFile("views/error.html", res); // Serve a generic error HTML page
  }
};

// --- Define GET route ---
exports.get = (url, action) => {
  routes["GET"][url] = action; // Map URL to action function for GET requests
};

// --- Define POST route ---
exports.post = (url, action) => {
  routes["POST"][url] = action; // Map URL to action function for POST requests
};
