"use strict"; // Enforce strict mode for safer JavaScript

// Import the Course model to interact with MongoDB
const Course = require("../models/course");

module.exports = {
  // Controller to fetch all courses from the database
  index: (req, res, next) => {
    Course.find({}) // Find all courses (no filter applied)
      .then(courses => {
        res.locals.courses = courses; // Store courses in res.locals for access in the view
        next(); // Pass control to the next middleware (usually the view renderer)
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`); // Log error for debugging
        next(error); // Forward error to the error-handling middleware
      });
  },

  // Controller to render the courses index view
  indexView: (req, res) => {
    res.render("courses/index"); // Render EJS template at views/courses/index.ejs
  }
};
