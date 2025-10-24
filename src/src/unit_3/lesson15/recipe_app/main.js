"use strict";

// ========================
// Module Imports
// ========================
const express = require("express"); // Express framework
const app = express(); // Initialize Express app
const errorController = require("./controllers/errorController"); // Custom error-handling middleware
const homeController = require("./controllers/homeController"); // Home route handlers
const layouts = require("express-ejs-layouts"); // Layout support for EJS templates
const mongoose = require("mongoose"); // Mongoose ODM for MongoDB
const Subscriber = require("./models/subscriber"); // Mongoose model for subscribers
const subscriberController = require("./controllers/subscribersController"); // Subscriber route handlers

// ========================
// Database Connection
// ========================
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", { useNewUrlParser: true }); // Connect to MongoDB

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// ========================
// Example Database Query
// ========================
// Find subscriber documents with name "Leotha Gradwell"
const query = Subscriber.find({ name: "Leotha Gradwell" }).exec();
query
  .then(docs => {
    console.log(docs); // Log the retrieved documents
  })
  .catch(err => {
    console.error(err); // Log any errors during the query
  });

// ========================
// Express App Configuration
// ========================
app.set("port", process.env.PORT || 3000); // Use environment port or default to 3000
app.set("view engine", "ejs"); // Use EJS as the template engine

// ========================
// Middleware
// ========================
app.use(express.static("public")); // Serve static files from 'public' folder
app.use(layouts); // Enable EJS layouts
app.use(
  express.urlencoded({ extended: false }) // Parse URL-encoded form data
);
app.use(express.json()); // Parse JSON request bodies
app.use(homeController.logRequestPaths); // Log every incoming request URL

// ========================
// Routes
// ========================
// Home page route
app.get("/", homeController.index); // Render index.ejs

// Courses page route
app.get("/courses", homeController.showCourses); // Render courses.ejs

// Subscribers page route
// Retrieves all subscribers using subscriberController, then renders subscribers.ejs
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data });
  }
);

// Contact/Subscription page route
app.get("/contact", subscriberController.getSubscriptionPage);

// Save subscriber route (form submission)
app.post("/subscribe", subscriberController.saveSubscriber);

// ========================
// Error Handling Middleware
// ========================
app.use(errorController.logErrors); // Log errors
app.use(errorController.respondNoResourceFound); // Handle 404 errors
app.use(errorController.respondInternalError); // Handle 500 errors

// ========================
// Start Server
// ========================
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

/*
  SUMMARY:
  1. Imports required modules: Express, Mongoose, controllers, and layouts.
  2. Connects to MongoDB using Mongoose and logs success/failure.
  3. Demonstrates a sample query to find subscribers by name.
  4. Sets Express configuration: port and view engine.
  5. Adds middleware for static files, EJS layouts, URL-encoded data, JSON, and request logging.
  6. Defines routes for home, courses, subscribers, contact, and form submission.
  7. Uses custom error-handling middleware for logging, 404, and 500 errors.
  8. Starts the Express server on the configured port.
*/
