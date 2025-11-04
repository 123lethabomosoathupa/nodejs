"use strict"; // Enforce strict mode for safer JavaScript

// Import the Course model
const Course = require("../models/course");

module.exports = {
  // Controller to fetch all courses from the database
  index: (req, res, next) => {
    Course.find({}) // Find all courses (empty filter object)
      .then(courses => {
        res.locals.courses = courses; // Store courses in res.locals to pass to the view
        next(); // Call next middleware (usually the view renderer)
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`); // Log any errors
        next(error); // Pass the error to the error-handling middleware
      });
  },

  // Controller to render the courses index view
  indexView: (req, res) => {
    res.render("courses/index"); // Render EJS template at views/courses/index.ejs
  }
};
