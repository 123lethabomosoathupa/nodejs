"use strict"; 
// Enforce strict mode for safer JavaScript coding

const router = require("express").Router(); 
// Create a new Express router instance

const coursesController = require("../controllers/coursesController"); 
// Import the coursesController to handle course-related logic

// Route: GET /courses/
// Fetch all courses and render index view
router.get("/", coursesController.index, coursesController.indexView);

// Route: GET /courses/new
// Render form to create a new course
router.get("/new", coursesController.new);

// Route: POST /courses/create
// Create a new course in the database and redirect
router.post("/create", coursesController.create, coursesController.redirectView);

// Route: GET /courses/:id/edit
// Render form to edit an existing course
router.get("/:id/edit", coursesController.edit);

// Route: PUT /courses/:id/update
// Update a course by ID and redirect
router.put("/:id/update", coursesController.update, coursesController.redirectView);

// Route: GET /courses/:id
// Show details of a specific course
router.get("/:id", coursesController.show, coursesController.showView);

// Route: DELETE /courses/:id/delete
// Delete a course by ID and redirect
router.delete("/:id/delete", coursesController.delete, coursesController.redirectView);

// Export the router to be used in the main app
module.exports = router;
