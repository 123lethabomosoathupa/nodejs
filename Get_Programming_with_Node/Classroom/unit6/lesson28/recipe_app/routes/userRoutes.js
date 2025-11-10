"use strict"; 
// Enforce strict mode for safer JavaScript coding

const router = require("express").Router(); 
// Create a new Express router instance

const usersController = require("../controllers/usersController"); 
// Import usersController to handle user-related logic

// Route: GET /users/
// Fetch all users and render index view
router.get("/", usersController.index, usersController.indexView);

// Route: GET /users/new
// Render form to create a new user
router.get("/new", usersController.new);

// Route: POST /users/create
// Validate user input, create a new user in DB, and redirect
router.post("/create", usersController.validate, usersController.create, usersController.redirectView);

// Route: GET /users/login
// Render login form
router.get("/login", usersController.login);

// Route: POST /users/login
// Authenticate user using Passport.js
router.post("/login", usersController.authenticate);

// Route: GET /users/logout
// Logout the user and redirect
router.get("/logout", usersController.logout, usersController.redirectView);

// Route: GET /users/:id/edit
// Render edit form for a specific user
router.get("/:id/edit", usersController.edit);

// Route: PUT /users/:id/update
// Update a user by ID and redirect
router.put("/:id/update", usersController.update, usersController.redirectView);

// Route: GET /users/:id
// Show details of a specific user
router.get("/:id", usersController.show, usersController.showView);

// Route: DELETE /users/:id/delete
// Delete a user by ID and redirect
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

// Export the router to be used in the main app
module.exports = router;
