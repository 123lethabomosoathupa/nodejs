"use strict"; // Enforce strict mode for safer JavaScript

// Import the Course model to interact with MongoDB
const Course = require("../models/course");

module.exports = {
  // --- FETCH ALL COURSES ---
  index: (req, res, next) => {
    Course.find({}) // Find all courses (no filter)
      .then(courses => {
        res.locals.courses = courses; // Store courses in res.locals for access in the view
        next(); // Pass control to the next middleware (usually indexView)
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`); // Log any errors
        next(error); // Forward error to error-handling middleware
      });
  },

  // --- RENDER COURSES INDEX VIEW ---
  indexView: (req, res) => {
    res.render("courses/index"); // Render the EJS template at views/courses/index.ejs
  }
};
