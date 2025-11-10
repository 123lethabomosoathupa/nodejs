"use strict"; // Enforce strict mode for better syntax and runtime checks

// =========================
// Import required modules
// =========================
const express = require("express"),              // Web framework for building server routes
  app = express(),                               // Create an Express application
  layouts = require("express-ejs-layouts"),      // Template layout support for EJS
  mongoose = require("mongoose"),                // MongoDB object modeling tool
  errorController = require("./controllers/errorController"),  // Handles app errors
  homeController = require("./controllers/homeController"),    // Handles home and contact routes
  subscribersController = require("./controllers/subscribersController"), // Manages subscriber logic
  usersController = require("./controllers/usersController"),             // Manages user logic
  coursesController = require("./controllers/coursesController"),         // Manages course logic
  Subscriber = require("./models/subscriber");   // Mongoose model for the "Subscriber" collection

// =========================
// Database Configuration
// =========================
mongoose.Promise = global.Promise; // Use built-in JavaScript promises for Mongoose

// Connect to local MongoDB database named "recipe_db"
mongoose.connect(
  "mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);

// (Deprecated but harmless) — allows index creation without warnings in older Mongoose versions
mongoose.set("useCreateIndex", true);

// Log confirmation when database connection is established
const db = mongoose.connection;
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

// =========================
// Express App Configuration
// =========================
app.set("port", process.env.PORT || 3000); // Use environment port or default to 3000
app.set("view engine", "ejs");              // Set EJS as the template engine

// =========================
// Middleware Setup
// =========================
app.use(express.static("public"));          // Serve static assets (CSS, JS, images) from /public
app.use(layouts);                           // Enable layout support for EJS
app.use(
  express.urlencoded({
    extended: false                         // Parse URL-encoded data (from forms)
  })
);
app.use(express.json());                    // Parse JSON request bodies
app.use(homeController.logRequestPaths);    // Custom middleware that logs every route request

// =========================
// ROUTES
// =========================

// Home page and contact/subscription page
app.get("/", homeController.index);
app.get("/contact", homeController.getSubscriptionPage);

// User routes — displays list of users
app.get("/users", usersController.index, usersController.indexView);

// Subscriber routes — displays list of subscribers
app.get("/subscribers", subscribersController.index, subscribersController.indexView);

// Course routes — displays list of available courses
app.get("/courses", coursesController.index, coursesController.indexView);

// Handle subscription form submission
app.post("/subscribe", subscribersController.saveSubscriber);

// =========================
// ERROR HANDLING
// =========================
app.use(errorController.logErrors);               // Log any errors that occur
app.use(errorController.respondNoResourceFound);  // Handle 404 (Page Not Found)
app.use(errorController.respondInternalError);    // Handle 500 (Server Errors)

// =========================
// SERVER STARTUP
// =========================
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});


// =========================
// 🧠 SUMMARY
// =========================
/*
This file is the main entry point of the Express + Mongoose web application.

It does the following:
1. Imports necessary modules for routing, templating, and database operations.
2. Connects to a MongoDB database named "recipe_db" using Mongoose.
3. Configures Express with:
   - EJS templates and layouts
   - Static file serving
   - Middleware for parsing form and JSON data
   - Request logging middleware
4. Defines routes for:
   - Home and contact pages
   - Viewing users, subscribers, and courses
   - Submitting new subscribers via form
5. Handles errors gracefully (404 and 500).
6. Starts a server on port 3000 (or the system’s assigned port).

In short:
➡ This script boots up your web server,
➡ connects it to MongoDB,
➡ registers all your routes,
➡ and handles both valid requests and errors.
*/
