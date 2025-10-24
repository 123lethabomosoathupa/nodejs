"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Import Required Modules ===
const express = require("express"),               // Web framework for building server and routing
  app = express(),                                // Initialize Express app
  homeController = require("./controllers/homeController"), // Handles homepage and courses routes
  errorController = require("./controllers/errorController"), // Handles errors like 404 and 500
  layouts = require("express-ejs-layouts");       // EJS layout middleware for template structure

// === View Engine Setup ===
app.set("view engine", "ejs"); // Use EJS as the templating engine

// === App Configuration ===
app.set("port", process.env.PORT || 3000);       // Set server port (default 3000)

// === Middleware ===
// Parse URL-encoded form data into req.body
app.use(
  express.urlencoded({
    extended: false // Do not allow nested objects
  })
);
// Parse JSON request bodies
app.use(express.json());
// Enable EJS layouts
app.use(layouts);
// Serve static files from the "public" folder (CSS, images, JS)
app.use(express.static("public"));

// === ROUTES ===

// Home page route – renders index.ejs
app.get("/", (req, res) => {
  res.render("index");
});

// Courses page – handled by homeController
app.get("/courses", homeController.showCourses);

// Contact / Sign-Up page – shows the subscription form
app.get("/contact", homeController.showSignUp);

// Handle POST request when user submits the contact form
app.post("/contact", homeController.postedSignUpForm);

// === ERROR HANDLING ===
// Handle 404 Page Not Found
app.use(errorController.pageNotFoundError);
// Handle 500 Internal Server Errors
app.use(errorController.internalServerError);

// === START SERVER ===
// Start listening on configured port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
