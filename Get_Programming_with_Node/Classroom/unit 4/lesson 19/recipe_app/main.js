"use strict"; // Enforce strict mode for safer JavaScript

// Import required modules and initialize Express app
const express = require("express"),
  methodOverride = require("method-override"), // To support PUT and DELETE in forms
  app = express(), // Initialize Express app
  layouts = require("express-ejs-layouts"), // Layouts support for EJS
  mongoose = require("mongoose"), // Mongoose for MongoDB
  errorController = require("./controllers/errorController"), // Error-handling middleware
  homeController = require("./controllers/homeController"), // Home controller
  subscribersController = require("./controllers/subscribersController"), // Subscribers controller
  usersController = require("./controllers/usersController"), // Users controller
  coursesController = require("./controllers/coursesController"), // Courses controller
  Subscriber = require("./models/subscriber"); // Subscriber model

// === Connect to MongoDB ===
mongoose.connect("mongodb://localhost:27017/recipe_db") // Connect to local MongoDB
  .then(() => console.log("✅ Connected to MongoDB")) // Success message
  .catch(err => console.error("❌ Connection error:", err)); // Error message if connection fails

// === Optional: confirm connection ===
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// === Express App Setup ===
app.set("port", process.env.PORT || 3000); // Set port (from environment or default 3000)
app.set("view engine", "ejs"); // Set EJS as the templating engine

// Middleware setup
app.use(methodOverride("_method", { methods: ["POST", "GET"] })); // Allow PUT & DELETE via query param `_method`
app.use(express.static("public")); // Serve static files from "public" folder
app.use(layouts); // Use express-ejs-layouts for layout support
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded form data
app.use(express.json()); // Parse JSON request bodies

// === Custom Middleware ===
app.use(homeController.logRequestPaths); // Log all incoming request paths

// === Routes ===

// Home routes
app.get("/", homeController.index); // Home page
app.get("/contact", homeController.getSubscriptionPage); // Contact / subscription page

// Users routes (CRUD)
app.get("/users", usersController.index, usersController.indexView); // List all users
app.get("/users/new", usersController.new); // Show form to create new user
app.post("/users/create", usersController.create, usersController.redirectView); // Handle new user creation
app.get("/users/:id", usersController.show, usersController.showView); // Show single user details
app.get("/users/:id/edit", usersController.edit); // Show edit form for user
app.put("/users/:id/update", usersController.update, usersController.redirectView); // Update user info
app.delete("/users/:id", usersController.delete, usersController.redirectView); // Delete a user

// Subscribers and Courses routes
app.get("/subscribers", subscribersController.index, subscribersController.indexView); // List subscribers
app.get("/courses", coursesController.index, coursesController.indexView); // List courses
app.post("/subscribe", subscribersController.saveSubscriber); // Handle new subscriber form submission

// === Error Handling Middleware ===
app.use(errorController.logErrors); // Log errors
app.use(errorController.respondNoResourceFound); // Handle 404
app.use(errorController.respondInternalError); // Handle 500

// === Start Server ===
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`); // Log server start
});
