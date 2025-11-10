"use strict"; 
// Enforces strict mode — helps catch common coding mistakes like undeclared variables.

const router = require("express").Router(), 
// Import Express router to define modular route handlers

  homeController = require("../controllers/homeController"); 
// Import the Home controller to handle home page and contact page requests

// ------------------------------------------------------
// 🏠 HOME ROUTES
// ------------------------------------------------------

// GET / → Render home page
router.get("/", homeController.index); 
// Calls the index method in homeController to render the home page

// GET /contact → Render contact page
router.get("/contact", homeController.contact); 
// Calls the contact method in homeController to render the contact page

// ------------------------------------------------------
// 🧩 EXPORT ROUTER
// ------------------------------------------------------
module.exports = router; 
// Export the router to be used in app.js or main server file
