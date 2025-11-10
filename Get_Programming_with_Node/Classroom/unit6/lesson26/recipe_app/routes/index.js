"use strict"; 
// Enforces strict mode — helps catch common coding mistakes like undeclared variables.

const router = require("express").Router(), 
// Import Express router to define modular route handlers

  userRoutes = require("./userRoutes"), 
// Import routes for user-related endpoints

  subscriberRoutes = require("./subscriberRoutes"), 
// Import routes for subscriber-related endpoints

  coursesRoutes = require("./coursesRoutes"),  
// Import routes for course-related endpoints (note variable name matches file)

  errorRoutes = require("./errorRoutes"), 
// Import routes for handling errors (404, 500, logging)

  homeRoutes = require("./homeRoutes"); 
// Import routes for home page and static pages like contact

// ------------------------------------------------------
// 🔗 USE ROUTERS
// ------------------------------------------------------

// Mount user routes at /users
router.use("/users", userRoutes); 

// Mount subscriber routes at /subscribers
router.use("/subscribers", subscriberRoutes); 

// Mount courses routes at /courses
router.use("/courses", coursesRoutes); 

// Mount home routes at root /
router.use("/", homeRoutes); 

// Mount error-handling routes at root / (for unmatched routes)
router.use("/", errorRoutes); 

// ------------------------------------------------------
// 🧩 EXPORT ROUTER
// ------------------------------------------------------
module.exports = router; 
// Export the main router to be used in app.js (central route handler)
