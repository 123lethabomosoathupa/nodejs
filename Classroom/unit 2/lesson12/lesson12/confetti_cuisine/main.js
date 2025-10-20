/*
========================================
 main.js
----------------------------------------
 SUMMARY:
 This file is the main entry point for the Express.js application.
 It sets up:
  - Express server configuration
  - Middleware (EJS layouts, body parsing, logging)
  - Route handling (GET and POST)
  - Controller connections
  - Server startup on the configured port
========================================
*/

// Import the Express framework
const express = require("express");

// Create an Express application instance
const app = express();

// Import the controller module that handles route logic
const homeController = require("./controllers/homeController");

// Import the EJS layouts middleware for using layout templates
const layouts = require("express-ejs-layouts");

// === APP CONFIGURATION ===

// Set the port for the server (use environment variable or default to 3000)
app.set("port", process.env.PORT || 3000);

// Set EJS as the view engine for rendering dynamic HTML pages
app.set("view engine", "ejs");

// === MIDDLEWARE SETUP ===

// Enable EJS layouts middleware so views can share a common layout structure
app.use(layouts);

// Middleware to parse URL-encoded data (used for form submissions)
app.use(
  express.urlencoded({
    extended: false
  })
);

// Middleware to parse JSON data (used for APIs or AJAX requests)
app.use(express.json());

// Custom middleware to log each incoming request URL
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

// === ROUTES ===

// Route for GET requests to /items/:vegetable
// Example: /items/carrot → handled by homeController.sendReqParam
app.get("/items/:vegetable", homeController.sendReqParam);

// Route for POST requests to the root URL ("/")
app.post("/", homeController.sendPost);

// Route for GET requests to /name/:myName
// Example: /name/Lethabo → handled by homeController.respondWithName
app.get("/name/:myName", homeController.respondWithName);

// === START SERVER ===

// Start the server and listen on the configured port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
