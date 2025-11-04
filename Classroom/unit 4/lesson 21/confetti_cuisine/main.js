"use strict"; // Enforce strict mode for safer JavaScript

// --- IMPORTS ---
const express = require("express"); // Express framework
const app = express(); // Create Express app instance
const errorController = require("./controllers/errorController"); // Custom error handlers
const homeController = require("./controllers/homeController"); // Home page and courses logic
const layouts = require("express-ejs-layouts"); // EJS layouts middleware
const mongoose = require("mongoose"); // MongoDB ODM
const Subscriber = require("./models/subscriber"); // Subscriber model
const subscriberController = require("./controllers/subscribersController"); // Subscribers logic

// --- CONNECT TO MONGODB ---
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine", { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// --- EXPRESS APP SETUP ---
app.set("port", process.env.PORT || 3000); // Port setup
app.set("view engine", "ejs"); // Set view engine to EJS

// --- MIDDLEWARE ---
app.use(express.static("public")); // Serve static files from public folder
app.use(layouts); // Use EJS layouts middleware
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (form submissions)
app.use(express.json()); // Parse JSON bodies

// --- ROUTES ---
// Home page
app.get("/", homeController.index); // Renders index.ejs
// Courses page
app.get("/courses", homeController.showCourses); // Renders courses.ejs
// Handle posted sign-up form from contact page
app.post("/contact", homeController.postedSignUpForm);

// List all subscribers (with controller)
app.get("/subscribers", subscriberController.getAllSubscribers, (req, res, next) => {
    res.render("subscribers", { subscribers: req.data }); // Renders subscribers.ejs
});

// Subscription/contact page
app.get("/contact", subscriberController.getSubscriptionPage);
// Handle subscription form submission
app.post("/subscribe", subscriberController.saveSubscriber);

// --- ERROR HANDLING ---
app.use(errorController.respondNoResourceFound); // Handle 404 errors
app.use(errorController.respondInternalError);   // Handle 500 errors

// --- START SERVER ---
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
