"use strict";

// Import required modules
const express = require("express"); // Express framework for server creation
const app = express(); // Initialize Express app
const errorController = require("./controllers/errorController"); // Custom error handling
const homeController = require("./controllers/homeController"); // Custom home controller
const layouts = require("express-ejs-layouts"); // For layout support in EJS templates

// MongoDB connection setup
const MongoDB = require("mongodb").MongoClient;
const dbURL = "mongodb://0.0.0.0:27017"; // MongoDB server URL
const dbName = "recipe_db"; // Database name

// Connect to MongoDB
MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error; // Throw error if connection fails

  // Select the database
  let db = client.db(dbName);

  // Insert a document into the 'contacts' collection
  db.collection("contacts").insert(
    {
      name: "Jada Mathele",
      email: "jada@mathele.com",
    },
    (error, db) => {
      if (error) throw error;
      console.log(db); // Log the result of the insert operation
    }
  );

  // Find all documents in 'contacts' collection and log them
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data); // Print all contacts as an array
    });
});

// Set Express app configurations
app.set("port", process.env.PORT || 3000); // Use environment port or 3000
app.set("view engine", "ejs"); // Set EJS as the view engine

// Middleware setup
app.use(express.static("public")); // Serve static files from 'public' folder
app.use(layouts); // Enable EJS layouts
app.use(
  express.urlencoded({
    extended: false, // Parse URL-encoded bodies
  })
);
app.use(express.json()); // Parse JSON bodies
app.use(homeController.logRequestPaths); // Custom middleware to log all request paths

// Define routes
app.get("/name", homeController.respondWithName); // GET route returning a name
app.get("/items/:vegetable", homeController.sendReqParam); // GET route with URL parameter

app.post("/", (req, res) => {
  console.log(req.body); // Log request body from form submissions
  console.log(req.query); // Log query parameters
  res.send("POST Successful!"); // Send response to client
});

// Error handling middleware
app.use(errorController.logErrors); // Log errors
app.use(errorController.respondNoResourceFound); // Handle 404 errors
app.use(errorController.respondInternalError); // Handle 500 errors

// Start the server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

/*
  SUMMARY:
  1. Imports and initializes Express and MongoDB modules.
  2. Connects to a MongoDB database ('recipe_db') and inserts a contact document.
  3. Retrieves and logs all documents from the 'contacts' collection.
  4. Sets up EJS as the view engine and middleware for static files, layouts, form data, and JSON.
  5. Defines GET and POST routes using the homeController.
  6. Implements error handling using a custom errorController.
  7. Starts an Express server on port 3000 (or environment-defined port).

  This code essentially demonstrates a basic Express server with MongoDB integration,
  handling CRUD-like operations (insert and find), and structured routing with error handling.
*/
