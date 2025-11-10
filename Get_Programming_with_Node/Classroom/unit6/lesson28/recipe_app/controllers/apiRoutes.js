"use strict"; 
// Enforce strict mode to catch common errors and prevent unsafe actions in JavaScript

const router = require("express").Router(), 
  // Import Express and create a new router instance for defining routes
  usersController = require("../controllers/usersController"), 
  // Import the users controller, which handles user-related logic
  coursesController = require("../controllers/coursesController"); 
  // Import the courses controller, which handles course-related logic

// Define a POST route for "/login" that uses the apiAuthenticate method from usersController
router.post("/login", usersController.apiAuthenticate);

// Define a GET route for joining a specific course by ID
// First, it runs coursesController.join to handle the join logic
// Then, it runs coursesController.respondJSON to send back a JSON response
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);

// Define a GET route for listing all courses
// First, it runs coursesController.index to fetch courses
// Then, it runs coursesController.filterUserCourses to filter courses specific to the user
// Finally, it runs coursesController.respondJSON to send back a JSON response
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);

// Use a generic error-handling middleware for any routes above that throw an error
// coursesController.errorJSON sends the error as a JSON response
router.use(coursesController.errorJSON);

// Export the router so it can be used in other parts of the application
module.exports = router;
