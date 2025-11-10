"use strict"; 
// Enforce strict mode for safer JavaScript coding

const router = require("express").Router(), 
  // Create a new Express router instance
  coursesController = require("../controllers/coursesController"); 
  // Import the coursesController to handle course-related logic

// Route: GET /
// Fetch all courses from DB and render the index view
router.get("/", coursesController.index, coursesController.indexView);

// Route: GET /new
// Render form to create a new course
router.get("/new", coursesController.new);

// Route: POST /create
// Create a new course and redirect to courses index
router.post("/create", coursesController.create, coursesController.redirectView);

// Route: GET /:id/edit
// Render edit form for a specific course
router.get("/:id/edit", coursesController.edit);

// Route: PUT /:id/update
// Update a specific course by ID and redirect
router.put("/:id/update", coursesController.update, coursesController.redirectView);

// Route: GET /:id
// Show details of a specific course
router.get("/:id", coursesController.show, coursesController.showView);

// Route: DELETE /:id/delete
// Delete a specific course and redirect
router.delete("/:id/delete", coursesController.delete, coursesController.redirectView);

// Export the router to be used in the main app
module.exports = router;
