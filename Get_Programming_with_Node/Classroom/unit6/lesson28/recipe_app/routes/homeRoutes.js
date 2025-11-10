"use strict"; 
// Enforce strict mode for safer JavaScript coding

const router = require("express").Router(); 
// Create a new Express router instance

const homeController = require("../controllers/homeController"); 
// Import the homeController to handle home page logic

// Route: GET /
// Render the home page (index view)
router.get("/", homeController.index);

// Route: GET /contact
// Render the contact/subscription page
// Previously: router.get("/contact", homeController.contact);
router.get("/contact", homeController.getSubscriptionPage);

// Export the router to be used in the main app
module.exports = router;
