"use strict"; 
// Enforces strict mode — helps catch common coding mistakes like undeclared variables.

const router = require("express").Router(), 
// Import Express router to define modular route handlers

  subscribersController = require("../controllers/subscribersController"); 
// Import the subscribers controller to handle subscriber-related requests

// ------------------------------------------------------
// 📌 ROUTES FOR SUBSCRIBERS
// ------------------------------------------------------

// GET /subscribers/ → List all subscribers
router.get("/", subscribersController.index, subscribersController.indexView); 
// First, fetch all subscribers (index), then render the view (indexView)

// GET /subscribers/new → Show form to create a new subscriber
router.get("/new", subscribersController.new); 
// Renders the new subscriber form page

// POST /subscribers/create → Create a new subscriber
router.post("/create", subscribersController.create, subscribersController.redirectView); 
// First, create subscriber in DB, then redirect to subscriber list

// GET /subscribers/:id/edit → Show form to edit an existing subscriber
router.get("/:id/edit", subscribersController.edit); 
// Fetch subscriber by ID and render edit form

// PUT /subscribers/:id/update → Update subscriber information
router.put("/:id/update", subscribersController.update, subscribersController.redirectView); 
// Update subscriber in DB and redirect to subscriber detail page

// GET /subscribers/:id → Show details of a single subscriber
router.get("/:id", subscribersController.show, subscribersController.showView); 
// Fetch subscriber by ID and render its details view

// DELETE /subscribers/:id/delete → Delete a subscriber
router.delete("/:id/delete", subscribersController.delete, subscribersController.redirectView); 
// Delete subscriber from DB and redirect to subscriber list

// ------------------------------------------------------
// 🧩 EXPORT ROUTER
// ------------------------------------------------------
module.exports = router; 
// Export the router to be used in main router (index.js) or app.js
