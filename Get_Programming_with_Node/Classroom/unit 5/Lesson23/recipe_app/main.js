"use strict"; // Enforces strict mode for cleaner, more secure JavaScript.

// ----------------------------
// ✅ MODULE IMPORTS
// ----------------------------
const express = require("express"); // Web framework for Node.js
const app = express(); // Create an Express app instance
const router = express.Router(); // Use an Express router to organize routes
const layouts = require("express-ejs-layouts"); // Enables EJS layout templates
const mongoose = require("mongoose"); // ODM for MongoDB
const methodOverride = require("method-override"); // Allows using PUT/DELETE with HTML forms
const errorController = require("./controllers/errorController"); // Custom error-handling controller
const homeController = require("./controllers/homeController"); // Handles homepage and general routes
const subscribersController = require("./controllers/subscribersController"); // Handles subscriber CRUD
const usersController = require("./controllers/usersController"); // Handles user CRUD and login
const coursesController = require("./controllers/coursesController"); // Handles course CRUD
const Subscriber = require("./models/subscriber"); // Mongoose model for subscribers

// Session and flash message dependencies
const expressSession = require("express-session"); // Manages user sessions
const cookieParser = require("cookie-parser"); // Parses cookies for session tracking
const connectFlash = require("connect-flash"); // Enables temporary flash messages
const { body, validationResult } = require("express-validator"); // Handles input validation

// ----------------------------
// ✅ MONGOOSE CONFIGURATION
// ----------------------------
mongoose.Promise = global.Promise; // Set Mongoose to use native Promises
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db"); // Connect to local MongoDB database
const db = mongoose.connection;

// Confirm successful connection
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

// ----------------------------
// ✅ APP CONFIGURATION
// ----------------------------
app.set("port", process.env.PORT || 3000); // Set port from environment or default to 3000
app.set("view engine", "ejs"); // Set EJS as template engine

// Middleware setup
router.use(express.static("public")); // Serve static files (CSS, images, JS)
router.use(layouts); // Enable EJS layouts
router.use(express.urlencoded({ extended: false })); // Parse form data
router.use(express.json()); // Parse JSON requests
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"], // Allow using _method to fake PUT/DELETE requests
  })
);

// ----------------------------
// ✅ COOKIE, SESSION & FLASH CONFIG
// ----------------------------
router.use(cookieParser("secret_passcode")); // Parse and sign cookies
router.use(
  expressSession({
    secret: "secret_passcode", // Session encryption key
    cookie: { maxAge: 4000000 }, // Session lifespan
    resave: false, // Don’t resave unchanged sessions
    saveUninitialized: false, // Don’t save empty sessions
  })
);
router.use(connectFlash()); // Enable flash message support

// Pass flash messages to all views
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash(); // Store flash messages in response locals
  next();
});

// ----------------------------
// ✅ HOME ROUTES
// ----------------------------
router.use(homeController.logRequestPaths); // Log all incoming request paths
router.get("/", homeController.index); // Homepage route
router.get("/contact", homeController.getSubscriptionPage); // Contact/subscription form page

// ----------------------------
// ✅ USER ROUTES
// ----------------------------
router.get("/users", usersController.index, usersController.indexView); // Display all users
router.get("/users/new", usersController.new); // Form to create a new user

// Login routes (must appear before dynamic :id routes)
router.get("/users/login", usersController.login); // Login page
router.post("/users/login", usersController.authenticate, usersController.redirectView); // Authenticate user login

router.post("/users/create", usersController.create, usersController.redirectView); // Create new user
router.get("/users/:id/edit", usersController.edit); // Edit user page
router.put("/users/:id/update", usersController.update, usersController.redirectView); // Update user data
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView); // Delete user
router.get("/users/:id", usersController.show, usersController.showView); // Show single user details

// ----------------------------
// ✅ SUBSCRIBER ROUTES
// ----------------------------
router.get("/subscribers", subscribersController.index, subscribersController.indexView); // List all subscribers
router.get("/subscribers/new", subscribersController.new); // Form for new subscriber
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView); // Create subscriber
router.get("/subscribers/:id/edit", subscribersController.edit); // Edit subscriber form
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView); // Update subscriber
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView); // Delete subscriber
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView); // Show single subscriber
router.post("/subscribe", subscribersController.saveSubscriber); // Handle contact form subscriptions

// ----------------------------
// ✅ COURSE ROUTES
// ----------------------------
router.get("/courses", coursesController.index, coursesController.indexView); // List all courses
router.get("/courses/new", coursesController.new); // Form for new course
router.post("/courses/create", coursesController.create, coursesController.redirectView); // Create course
router.get("/courses/:id/edit", coursesController.edit); // Edit course form
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView); // Update course
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView); // Delete course
router.get("/courses/:id", coursesController.show, coursesController.showView); // Show single course

// ----------------------------
// ✅ RECIPE ROUTES (with validation)
// ----------------------------
router.post(
  "/recipes",
  [
    body("title").notEmpty().withMessage("Title is required"), // Validate title
    body("ingredients").notEmpty().withMessage("Ingredients are required"), // Validate ingredients
    body("instructions").notEmpty().withMessage("Instructions are required"), // Validate instructions
  ],
  (req, res) => {
    const errors = validationResult(req); // Collect validation results
    if (!errors.isEmpty()) {
      // If errors exist, send them as a response
      return res.status(400).json({ errors: errors.array() });
    }

    // Otherwise, continue with recipe creation logic
    res.send("✅ Recipe saved successfully!");
  }
);

// ----------------------------
// ✅ ERROR HANDLING
// ----------------------------
router.use(errorController.logErrors); // Log all errors
router.use(errorController.respondNoResourceFound); // Handle 404 (resource not found)
router.use(errorController.respondInternalError); // Handle 500 (server errors)

// ----------------------------
// ✅ APP STARTUP
// ----------------------------
app.use("/", router); // Mount router middleware to root path

app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
