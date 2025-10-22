"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Import Required Modules ===
const express = require("express");                        // Web framework for building the server
const app = express();                                     // Initialize Express app
const errorController = require("./controllers/errorController"); // Custom error handlers
const homeController = require("./controllers/homeController");   // Controller for homepage & courses
const layouts = require("express-ejs-layouts");            // Layout middleware for EJS templates
const mongoose = require("mongoose");                      // MongoDB ODM (Object Data Modeling)
const Subscriber = require("./models/subscriber");         // Mongoose model for subscriber data
const subscriberController = require("./controllers/subscribersController"); // Controller for subscribers

// === Connect to MongoDB ===
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
  useNewUrlParser: true
});

// Access the database connection
const db = mongoose.connection;

// Log a success message when connected to MongoDB
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// === App Configuration ===
app.set("port", process.env.PORT || 3000); // Set the server port (use environment variable if available)
app.set("view engine", "ejs");             // Use EJS as the templating engine

// === Middleware Setup ===
app.use(express.static("public")); // Serve static files (CSS, images, JS) from the "public" folder
app.use(layouts);                  // Enable EJS layout support

// Parse incoming form data (URL-encoded) and JSON data
app.use(
  express.urlencoded({
    extended: false,               // Do not allow nested objects in URL-encoded data
  })
);
app.use(express.json());            // Parse incoming JSON payloads

// === ROUTES ===

// Home route – renders index.ejs
app.get("/", homeController.index);

// Courses page – renders courses.ejs
app.get("/courses", homeController.showCourses);

// Handles POST requests from a signup form (method defined in homeController)
app.post("/contact", homeController.postedSignUpForm);

// Display all subscribers
// The first controller fetches data and attaches it to req.data
// The second function renders the subscribers.ejs page with that data
app.get("/subscribers", subscriberController.getAllSubscribers, (req, res, next) => {
  res.render("subscribers", { subscribers: req.data }); // Render the view and pass subscriber data
});

// Contact form page – shows the subscription form
app.get("/contact", subscriberController.getSubscriptionPage);

// Save a new subscriber to the database
app.post("/subscribe", subscriberController.saveSubscriber);

// === ERROR HANDLING ===
// Handle 404 (Not Found) errors
app.use(errorController.respondNoResourceFound);

// Handle 500 (Internal Server) errors
app.use(errorController.respondInternalError);

// === START SERVER ===
// Start listening on the configured port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
