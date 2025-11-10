"use strict"; 
// Enforces strict mode — helps catch common coding mistakes like undeclared variables.

const router = require("express").Router(), 
// Import Express router to define modular route handlers

  usersController = require("../controllers/usersController"); 
// Import the users controller to handle user-related requests

// ------------------------------------------------------
// 📌 ROUTES FOR USERS
// ------------------------------------------------------

// GET /users/ → List all users
router.get("/", usersController.index, usersController.indexView); 
// First, fetch all users (index), then render the view (indexView)

// GET /users/new → Show form to create a new user
router.get("/new", usersController.new); 
// Renders the new user form page

// POST /users/create → Create a new user with validation
router.post(
  "/create",
  ...usersController.validate,  // Apply validation middleware for email, password, zipCode
  usersController.create,       // Create the user in DB
  usersController.redirectView   // Redirect after creation
);

// GET /users/login → Render login form
router.get("/login", usersController.login); 

// POST /users/login → Authenticate user login
router.post("/login", usersController.authenticate); 
// Uses Passport's local strategy to authenticate

// GET /users/logout → Log out the current user
router.get("/logout", usersController.logout, usersController.redirectView); 
// Calls logout, then redirects

// GET /users/:id/edit → Show form to edit an existing user
router.get("/:id/edit", usersController.edit); 
// Fetch user by ID and render edit form

// PUT /users/:id/update → Update user information
router.put("/:id/update", usersController.update, usersController.redirectView); 
// Update user in DB and redirect to user detail page

// GET /users/:id → Show details of a single user
router.get("/:id", usersController.show, usersController.showView); 
// Fetch user by ID and render its details view

// DELETE /users/:id/delete → Delete a user
router.delete("/:id/delete", usersController.delete, usersController.redirectView); 
// Delete user from DB and redirect to user list

// ------------------------------------------------------
// 🧩 EXPORT ROUTER
// ------------------------------------------------------
module.exports = router; 
// Export the router to be used in main router (index.js) or app.js
