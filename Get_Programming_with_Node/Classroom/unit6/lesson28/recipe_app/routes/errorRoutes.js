"use strict"; 
// Enforce strict mode for safer JavaScript coding

const router = require("express").Router(); 
// Create a new Express router instance

const errorController = require("../controllers/errorController"); 
// Import the errorController to handle errors

// Middleware: Log all errors to the console
router.use(errorController.logErrors);

// Middleware: Respond with 404 Not Found for unknown routes
router.use(errorController.respondNoResourceFound);

// Middleware: Respond with 500 Internal Server Error for server errors
router.use(errorController.respondInternalError);

// Export the router to be used in the main app
module.exports = router;
