/*
========================================
 main.js
----------------------------------------
 SUMMARY:
 This is the main entry point of the Express.js application.
 It performs the following:
   - Sets up middleware for static files, EJS layouts, and body parsing.
   - Defines routes for GET and POST requests.
   - Connects controller logic for handling specific routes.
   - Handles custom error logging and responses.
   - Starts the server on the defined port.
========================================
*/

// === IMPORTS ===

// Import the Express framework
const express = require("express");

// Create an instance of the Express app
const app = express();

// Serve static files (CSS, JS, images, etc.) from the "public" folder
app.use(express.static("public"));

// Import controller modules
const homeController = require("./controllers/homeController"); // Handles main routes
const layouts = require("express-ejs-layouts"); // Middleware for EJS layout support
const errorController = require("./controllers/errorController"); // Handles error responses


const MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  dbName = "recipe_db";
MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
});
// === ERROR HANDLING MIDDLEWARE ===
// These middlewares are responsible for handling and responding to errors
app.use(errorController.logErrors);               // Logs error details to the console
app.use(errorController.respondNoResourceFound);  // Responds with a 404 if a route/resource is not found
app.use(errorController.respondInternalError);    // Responds with a 500 if a server error occurs

// === APP CONFIGURATION ===

// Set the port for the server (environment variable or default 3000)
app.set("port", process.env.PORT || 3000);

// Set EJS as the template engine for rendering dynamic views
app.set("view engine", "ejs");

// === MIDDLEWARE SETUP ===

// Enable EJS layout support (for shared templates)
app.use(layouts);

// Middleware to parse form submissions (URL-encoded data)
app.use(
  express.urlencoded({
    extended: false
  })
);

// Middleware to parse JSON data (for API requests)
app.use(express.json());

// Custom middleware to log each incoming request URL
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // Pass control to the next middleware or route
});

// === ROUTES ===

// GET request to /items/:vegetable
// Example: /items/carrot → handled by homeController.sendReqParam
app.get("/items/:vegetable", homeController.sendReqParam);

// POST request to root URL ("/")
// Example: Submitting a form → handled by homeController.sendPost
app.post("/", homeController.sendPost);

// GET request to /name/:myName
// Example: /name/Lethabo → renders EJS view with the name passed as a variable
app.get("/name/:myName", homeController.respondWithName);

// === SERVER START ===

// Start the Express server and listen for incoming connections
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
