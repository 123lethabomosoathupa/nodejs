"use strict";

// ========================
// Module Imports
// ========================
const express = require("express"); // Express framework for server
const app = express(); // Initialize Express app
const errorController = require("./controllers/errorController"); // Custom error handling middleware
const homeController = require("./controllers/homeController"); // Custom route handlers
const layouts = require("express-ejs-layouts"); // Layout support for EJS
const mongoose = require("mongoose"); // Mongoose for MongoDB object modeling
const Subscriber = require("./models/subscriber"); // Mongoose model for subscribers

// ========================
// Database Connection
// ========================
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true, // Use new URL parser
});

const db = mongoose.connection;

// Event listener: successful connection
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// ========================
// Creating and Querying Documents
// ========================

// Create a new Subscriber document and save to MongoDB
Subscriber.create({
  name: "Jada Mathele",
  email: "jada@mathele.com",
})
  .then((savedDoc) => {
    console.log("Saved document:", savedDoc); // Log saved document
  })
  .catch((err) => {
    console.log("Error saving document:", err); // Log errors if creation fails
  });

// Query for Subscriber documents with name "Jada Mathele"
const query = Subscriber.find({ name: "Jada Mathele" }).exec();
query
  .then((docs) => {
    console.log("Query results:", docs); // Log retrieved documents
  })
  .catch((err) => {
    console.error("Query error:", err); // Log query errors
  });

// ========================
// Express App Configuration
// ========================
app.set("port", process.env.PORT || 3000); // Use environment port or default to 3000
app.set("view engine", "ejs"); // Use EJS as template engine

// ========================
// Middleware
// ========================
app.use(express.static("public")); // Serve static files from 'public' folder
app.use(layouts); // Enable layout support
app.use(
  express.urlencoded({
    extended: false, // Parse URL-encoded form data
  })
);
app.use(express.json()); // Parse JSON request bodies
app.use(homeController.logRequestPaths); // Log every incoming request path

// ========================
// Routes
// ========================
app.get("/name", homeController.respondWithName); // Render homepage
app.get("/items/:vegetable", homeController.sendReqParam); // Respond with dynamic vegetable page

app.post("/", (req, res) => {
  console.log("POST body:", req.body); // Log form body
  console.log("POST query:", req.query); // Log query params
  res.send("POST Successful!"); // Respond to client
});

// ========================
// Error Handling Middleware
// ========================
app.use(errorController.logErrors); // Log all errors
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

  1. Imports Express, EJS layouts, Mongoose, custom controllers, and models.
  2. Connects to MongoDB using Mongoose and logs success/failure.
  3. Creates a new Subscriber document and queries for it in the database.
  4. Configures Express middleware for static files, layouts, URL-encoded forms, JSON, and request logging.
  5. Defines GET routes for homepage and dynamic vegetable pages.
  6. Defines a POST route that logs the request body and query parameters.
  7. Handles errors using custom middleware for logging, 404, and 500 responses.
  8. Starts the server on port 3000 (or environment-defined port).

  This setup demonstrates a modern, Mongoose-integrated Express app with structured routing, 
  middleware, database CRUD operations, and error handling.
*/
