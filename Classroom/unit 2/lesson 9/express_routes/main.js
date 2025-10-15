"use strict";

// Import required modules
const express = require("express"),
  app = express(),
  port = 3000;

// Import controller
const homeController = require("./controllers/homeController");

// Middleware to parse incoming data
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// === ROUTES ===

// Test POST route for contact form
app.post("/contact", (req, res) => {
  res.send("Contact information submitted successfully.");
});

// POST route to log form and query data
app.post("/", (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Query Params:", req.query);
  res.send("POST Successful!");
});

// Dynamic route example (uses controller)
app.get("/items/:vegetable", homeController.sendReqParam);

// Default home route
app.get("/", (req, res) => {
  res.send("Welcome to Express Routing!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
