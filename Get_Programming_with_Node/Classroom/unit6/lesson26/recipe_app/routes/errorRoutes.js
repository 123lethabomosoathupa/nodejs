"use strict"; 
// Enforces strict mode — helps catch common coding mistakes like undeclared variables.

const router = require("express").Router(), 
// Import Express router to define modular route handlers

  errorController = require("../controllers/errorController"); 
// Import the errorController which contains error-handling middleware

// ------------------------------------------------------
// 🛑 ERROR HANDLING MIDDLEWARE
// ------------------------------------------------------

// Log all errors to the console
router.use(errorController.logErrors); 
// Pass any errors to logErrors middleware (logs error stack)

// Handle 404 - Resource Not Found
router.use(errorController.respondNoResourceFound); 
// If no route matches, respond with 404 and message

// Handle 500 - Internal Server Error
router.use(errorController.respondInternalError); 
// Catch all other unhandled errors and respond with 500

// ------------------------------------------------------
// 🧩 EXPORT ROUTER
// ------------------------------------------------------
module.exports = router; 
// Export the router to be used in app.js or main server file
