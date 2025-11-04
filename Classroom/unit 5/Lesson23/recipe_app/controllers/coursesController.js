"use strict"; // Enforce strict mode for cleaner, safer JavaScript

// Import the Course model (Mongoose schema for MongoDB collection)
const Course = require("../models/course");

// Export an object containing all controller functions
module.exports = {
  // ----------------------------
  // ✅ INDEX: Get all courses
  // ----------------------------
  index: (req, res, next) => {
    Course.find({}) // Fetch all courses from the database
      .then(courses => {
        res.locals.courses = courses; // Store courses for the next middleware/view
        next(); // Move to next function (indexView)
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error); // Pass error to Express error handler
      });
  },

  // ----------------------------
  // ✅ INDEX VIEW: Render all courses
  // ----------------------------
  indexView: (req, res) => {
    res.render("courses/index"); // Render the courses index.ejs page
  },

  // ----------------------------
  // ✅ NEW: Render the "create course" form
  // ----------------------------
  new: (req, res) => {
    res.render("courses/new"); // Show the form to add a new course
  },

  // ----------------------------
  // ✅ CREATE: Save a new course to the database
  // ----------------------------
  create: (req, res, next) => {
    // Extract data from form fields
    let courseParams = {
      title: req.body.title,
      description: req.body.description,
      items: [req.body.items.split(",")], // Convert comma-separated items into an array
      zipCode: req.body.zipCode
    };

    // Create a new course record in MongoDB
    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = "/courses"; // Redirect to courses list after saving
        res.locals.course = course; // Store created course
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  // ----------------------------
  // ✅ SHOW: Find and display one specific course by ID
  // ----------------------------
  show: (req, res, next) => {
    let courseId = req.params.id; // Get ID from URL
    Course.findById(courseId) // Look up course in DB
      .then(course => {
        res.locals.course = course; // Store course for next function
        next();
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  // ----------------------------
  // ✅ SHOW VIEW: Render single course page
  // ----------------------------
  showView: (req, res) => {
    res.render("courses/show"); // Render show.ejs for a specific course
  },

  // ----------------------------
  // ✅ EDIT: Render edit form for a specific course
  // ----------------------------
  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId) // Find course by ID
      .then(course => {
        // Render edit form and pass current course data
        res.render("courses/edit", {
          course: course
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  // ----------------------------
  // ✅ UPDATE: Apply changes to a specific course
  // ----------------------------
  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = {
        title: req.body.title,
        description: req.body.description,
        items: [req.body.items.split(",")],
        zipCode: req.body.zipCode
      };

    // Find course by ID and update with new data
    Course.findByIdAndUpdate(courseId, {
      $set: courseParams
    })
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`; // Redirect to the updated course page
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  // ----------------------------
  // ✅ DELETE: Remove a course from the database
  // ----------------------------
  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId) // Delete course by ID
      .then(() => {
        res.locals.redirect = "/courses"; // Redirect to course list after deletion
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },

  // ----------------------------
  // ✅ REDIRECT VIEW: Handle redirects cleanly
  // ----------------------------
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath); // Redirect if a path is set
    else next(); // Otherwise move to next middleware
  }
};
