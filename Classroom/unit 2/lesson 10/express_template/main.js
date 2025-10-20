// Import the Express framework
const express = require("express");
// Create an Express application instance
const app = express();

// Import the controller that contains route-handling logic
const homeController = require("./controllers/homeController");

// Import express-ejs-layouts to handle layout templates for EJS views
const layouts = require("express-ejs-layouts");

// ====================
// App Configuration
// ====================

// Set the port for the server to listen on (use environment variable PORT or default to 3000)
app.set("port", process.env.PORT || 3000);

// Set the view engine to EJS (Embedded JavaScript templates)
app.set("view engine", "ejs");

// ====================
// Middleware
// ====================

// Use express-ejs-layouts middleware to enable layout support for EJS views
app.use(layouts);

// Middleware to parse URL-encoded data (from HTML forms)
app.use(
  express.urlencoded({
    extended: false // only parses simple key-value pairs
  })
);

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// Custom middleware to log each request's URL
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // pass control to the next middleware/route
});

// ====================
// Routes
// ====================

// GET route with a URL parameter 'vegetable' handled by homeController.sendReqParam
app.get("/items/:vegetable", homeController.sendReqParam);

// POST route for the root path ("/") handled by homeController.sendPost
app.post("/", homeController.sendPost);

// GET route with a URL parameter 'myName' handled by homeController.respondWithName
app.get("/name/:myName", homeController.respondWithName);

// ====================
// Start Server
// ====================

// Start the server and listen on the configured port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

/* 
====================
Summary
====================

This Express.js application:

1. Sets up a server on a configurable port (default 3000).
2. Uses EJS as the template engine and supports layouts via express-ejs-layouts.
3. Includes middleware for:
   - Parsing URL-encoded and JSON data.
   - Logging incoming requests to the console.
4. Defines three routes:
   - GET /items/:vegetable → Handles requests for a specific vegetable.
   - POST / → Handles form submissions or JSON POST requests to the root path.
   - GET /name/:myName → Handles requests with a dynamic 'myName' parameter.
5. Starts the server and logs the URL where it is running.

This structure separates concerns using controllers and makes it easy to add more routes or middleware later.
*/
