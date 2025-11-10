"use strict"; 
// Enforces strict mode — helps catch errors like using undeclared variables.

const router = require("express").Router(), 
// Import Express router to define modular route handlers

  coursesController = require("../controllers/coursesController"); 
// Import the Courses controller to handle requests for courses

// ------------------------------------------------------
// 📌 ROUTES FOR COURSES
// ------------------------------------------------------

// GET /courses/ → List all courses
router.get("/", coursesController.index, coursesController.indexView); 
// First, fetch all courses (index), then render the view (indexView)

// GET /courses/new → Show form to create a new course
router.get("/new", coursesController.new); 
// Renders the new course form page

// POST /courses/create → Create a new course
router.post("/create", coursesController.create, coursesController.redirectView); 
// First, create course in DB, then redirect to courses list

// GET /courses/:id/edit → Show form to edit an existing course
router.get("/:id/edit", coursesController.edit); 
// Fetch course by ID and render edit form

// PUT /courses/:id/update → Update course information
router.put("/:id/update", coursesController.update, coursesController.redirectView); 
// Update course in DB and redirect to course detail page

// GET /courses/:id → Show details of a single course
router.get("/:id", coursesController.show, coursesController.showView); 
// Fetch course by ID and render its details view

// DELETE /courses/:id/delete → Delete a course
router.delete("/:id/delete", coursesController.delete, coursesController.redirectView); 
// Delete course from DB and redirect to courses list

// ------------------------------------------------------
// 🧩 EXPORT ROUTER
// ------------------------------------------------------
module.exports = router; 
// Export the router to be used in app.js or main server file
