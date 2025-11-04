"use strict"; // Enforce strict mode for safer JavaScript

// Import required modules and initialize Express app
const express = require("express"), // Express framework
  app = express(), // Initialize Express app
  layouts = require("express-ejs-layouts"), // Layouts support for EJS
  mongoose = require("mongoose"), // Mongoose for MongoDB
  errorController = require("./controllers/errorController"), // Custom error handlers
  homeController = require("./controllers/homeController"), // Home page controller
  subscribersController = require("./controllers/subscribersController"), // Subscribers controller
  usersController = require("./controllers/usersController"), // Users controller
  coursesController = require("./controllers/coursesController"), // Courses controller
  Subscriber = require("./models/subscriber"); // Subscriber model

// === Connect to MongoDB ===
mongoose.connect("mongodb://localhost:27017/recipe_db") // Connect to local MongoDB database
  .then(() => console.log("✅ Connected to MongoDB")) // Success message
  .catch(err => console.error("❌ Connection error:", err)); // Error message if connection fails

// === Optional: confirm connection ===
const db = mongoose.connection; // Get default connection
db.once("open", () => { // Listen for connection open event
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// === Express App Setup ===
app.set("port", process.env.PORT || 3000); // Set port (from environment or default 3000)
app.set("view engine", "ejs"); // Set EJS as the templating engine

// === Middleware Setup ===
app.use(express.static("public")); // Serve static files from "public" folder
app.use(layouts); // Use express-ejs-layouts for layout support
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded form data
app.use(express.json()); // Parse JSON request bodies

// === Custom Middleware & Controllers ===
app.use(homeController.logRequestPaths); // Log request paths for debugging

// Home routes
app.get("/", homeController.index); // Home page route
app.get("/contact", homeController.getSubscriptionPage); // Contact / subscription page

// User, Subscriber, and Course routes
app.get("/users", usersController.index, usersController.indexView); // List users
app.get("/subscribers", subscribersController.index, subscribersController.indexView); // List subscribers
app.get("/courses", coursesController.index, coursesController.indexView); // List courses

// Handle form submission for subscribing
app.post("/subscribe", subscribersController.saveSubscriber); // Save new subscriber

// === Error Handling Middleware ===
app.use(errorController.logErrors); // Log errors to console or file
app.use(errorController.respondNoResourceFound); // Handle 404 errors
app.use(errorController.respondInternalError); // Handle 500 server errors

// === Start the Server ===
app.listen(app.get("port"), () => { // Listen on specified port
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`); // Log server start
});
