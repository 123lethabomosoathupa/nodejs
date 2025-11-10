"use strict"; // Enforce strict mode for safer JavaScript

// Import required modules and initialize Express app
const express = require("express"),
  app = express(), // Initialize Express app
  layouts = require("express-ejs-layouts"), // Layout support for EJS
  mongoose = require("mongoose"), // MongoDB ORM
  errorController = require("./controllers/errorController"), // Error-handling middleware
  homeController = require("./controllers/homeController"), // Home page controllers
  subscribersController = require("./controllers/subscribersController"), // Subscribers controllers
  usersController = require("./controllers/usersController"), // Users controllers
  coursesController = require("./controllers/coursesController"), // Courses controllers
  Subscriber = require("./models/subscriber"); // Subscriber model

const methodOverride = require("method-override"); // To support PUT and DELETE from forms

// === Connect to MongoDB ===
mongoose.connect("mongodb://localhost:27017/recipe_db") // Connect to local MongoDB
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

// Optional: confirm connection
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// === Express App Setup ===
app.set("port", process.env.PORT || 3000); // Set server port
app.set("view engine", "ejs"); // Use EJS as templating engine

// Middleware
app.use(methodOverride("_method", { methods: ["POST", "GET"] })); // Enable PUT & DELETE via forms
app.use(express.static("public")); // Serve static files from /public
app.use(layouts); // Enable layouts for EJS
app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(express.json()); // Parse JSON payloads

// --- Logging middleware ---
app.use(homeController.logRequestPaths); // Log all request URLs

// === Routes ===

// Home routes
app.get("/", homeController.index); // Home page
app.get("/contact", homeController.getSubscriptionPage); // Contact page

// Users routes (CRUD)
app.get("/users", usersController.index, usersController.indexView); // List users
app.get("/users/new", usersController.new); // Form to create new user
app.post("/users/create", usersController.create, usersController.redirectView); // Create new user
app.get("/users/:id", usersController.show, usersController.showView); // Show user details
app.get("/users/:id/edit", usersController.edit); // Form to edit user
app.put("/users/:id/update", usersController.update, usersController.redirectView); // Update user
app.delete("/users/:id", usersController.delete, usersController.redirectView); // Delete user

// Subscribers & courses routes
app.get("/subscribers", subscribersController.index, subscribersController.indexView); // List subscribers
app.get("/courses", coursesController.index, coursesController.indexView); // List courses
app.post("/subscribe", subscribersController.saveSubscriber); // Save new subscriber

// === Error Handlers ===
app.use(errorController.logErrors); // Log all errors
app.use(errorController.respondNoResourceFound); // Handle 404
app.use(errorController.respondInternalError); // Handle 500

// === Start Server ===
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`); // Server running message
});
