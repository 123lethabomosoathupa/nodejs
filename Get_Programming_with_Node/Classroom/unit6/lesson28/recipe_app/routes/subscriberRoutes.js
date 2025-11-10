"use strict"; 
// Enforce strict mode for safer JavaScript coding

const router = require("express").Router(); 
// Create a new Express router instance

const subscribersController = require("../controllers/subscribersController"); 
// Import the subscribersController to handle subscriber-related logic

// Route: GET /subscribers/
// Fetch all subscribers and render index view
router.get("/", subscribersController.index, subscribersController.indexView);

// Route: GET /subscribers/new
// Render form to create a new subscriber
router.get("/new", subscribersController.new);

// Route: POST /subscribers/create
// Create a new subscriber in the DB and redirect
router.post("/create", subscribersController.create, subscribersController.redirectView);

// Route: POST /subscribers/subscribe
// Save subscriber from contact form submission
router.post("/subscribe", subscribersController.saveSubscriber);

// Route: GET /subscribers/:id/edit
// Render edit form for a specific subscriber
router.get("/:id/edit", subscribersController.edit);

// Route: PUT /subscribers/:id/update
// Update a subscriber by ID and redirect
router.put("/:id/update", subscribersController.update, subscribersController.redirectView);

// Route: GET /subscribers/:id
// Show details of a specific subscriber
router.get("/:id", subscribersController.show, subscribersController.showView);

// Route: DELETE /subscribers/:id/delete
// Delete a subscriber by ID and redirect
router.delete("/:id/delete", subscribersController.delete, subscribersController.redirectView);

// Export the router to be used in the main app
module.exports = router;
