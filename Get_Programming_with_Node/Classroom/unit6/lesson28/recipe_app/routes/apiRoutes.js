"use strict"; 
// Enforce strict mode for safer JavaScript coding

const router = require("express").Router(); 
// Create a new Express router instance

const coursesController = require("../controllers/coursesController"); 
// Import coursesController to handle course-related logic

// Route: GET /courses
// Fetch all courses, filter by user enrollment, and respond in JSON format
router.get(
  "/courses", 
  coursesController.index,             // Fetch all courses from DB
  coursesController.filterUserCourses, // Add "joined" info for current user
  coursesController.respondJSON        // Send courses as JSON response
);

// Route: GET /courses/:id/join
// Allow a user to join a specific course and respond in JSON
router.get(
  "/courses/:id/join", 
  coursesController.join,   // Add the course to the user's enrolled courses
  coursesController.respondJSON // Send success/failure in JSON
);

// API Error Handling Middleware
// Any errors in the above routes will be handled here and sent as JSON
router.use(coursesController.errorJSON); 

// Export the router to be used in the main app
module.exports = router;
