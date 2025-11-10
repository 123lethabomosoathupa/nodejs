"use strict"; 
// Enforce strict mode for safer JavaScript coding

const router = require("express").Router(); 
// Create a new Express router instance to combine all routes

// Import individual route modules
const userRoutes = require("./userRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const courseRoutes = require("./courseRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./apiRoutes");

// Mount the imported routes on specific URL paths
router.use("/users", userRoutes);        // All user-related routes start with /users
router.use("/subscribers", subscriberRoutes); // All subscriber routes start with /subscribers
router.use("/courses", courseRoutes);    // All course routes start with /courses
router.use("/api", apiRoutes);           // All API routes start with /api
router.use("/", homeRoutes);             // Home page and contact routes
router.use("/", errorRoutes);            // Error handling routes (404, 500, etc.)

// Export the main router to be used in app.js
module.exports = router;
