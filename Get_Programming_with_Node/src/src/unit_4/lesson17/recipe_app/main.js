/**
 * ============================================
 * SUMMARY
 * ============================================
 * This Node.js application uses Express.js, Mongoose, and EJS 
 * to serve a simple web app that connects to a MongoDB database 
 * called "recipe_db". It handles routes for:
 *   - Viewing home and course pages
 *   - Viewing and adding subscribers
 *   - Handling errors gracefully
 * 
 * The app uses controllers for routing logic, EJS layouts for rendering views, 
 * and middleware for logging and error handling.
 */

"use strict";

// Import required modules
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// Import models and controllers
const Subscriber = require("./models/subscriber");
const subscriberController = require("./controllers/subscribersController");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

// ============================================
// DATABASE CONNECTION
// ============================================

// Connect to the MongoDB database
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

// Log success message once connection is established
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

// Example query: find a subscriber by name
const query = Subscriber.find({ name: "Leotha Gradwell" }).exec();
query
  .then(docs => {
    console.log(docs); // Display results in the console
  })
  .catch(err => {
    console.error(err); // Handle errors if query fails
  });

// ============================================
// APP CONFIGURATION
// ============================================

// Set port and view engine
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Use middleware
app.use(express.static("public")); // Serve static files (CSS, images, etc.)
app.use(layouts); // Enable EJS layouts for consistent templates
app.use(
  express.urlencoded({
    extended: false, // Parse URL-encoded data (from forms)
  })
);
app.use(express.json()); // Parse incoming JSON data

// Custom middleware to log request paths
app.use(homeController.logRequestPaths);

// ============================================
// ROUTES
// ============================================

// Home page
app.get("/", homeController.index); // Renders index.ejs

// Courses page
app.get("/courses", homeController.showCourses); // Renders courses.ejs

// Subscribers list page
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data }); // Renders subscribers.ejs
  }
);

// Contact (subscription form) page
app.get("/contact", subscriberController.getSubscriptionPage);

// Handle subscription form submission
app.post("/subscribe", subscriberController.saveSubscriber);

// ============================================
// ERROR HANDLING
// ============================================

// Log errors
app.use(errorController.logErrors);

// Handle 404 - Resource not found
app.use(errorController.respondNoResourceFound);

// Handle 500 - Internal server errors
app.use(errorController.respondInternalError);

// ============================================
// SERVER STARTUP
// ============================================

app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
