"use strict"; // ✅ Enforce strict mode for cleaner JavaScript

// -------------------------
// Import Course Model
// -------------------------
const Course = require("../models/course");

// -------------------------
// Export Controller Methods
// -------------------------
module.exports = {

  // -------------------------------------------------
  // 🧾 INDEX — Fetch and list all courses
  // -------------------------------------------------
  index: (req, res, next) => {
    Course.find({})
      .then(courses => {
        res.locals.courses = courses; // Store fetched courses for the next middleware
        next(); // Continue to the next handler (indexView)
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error); // Pass the error to Express error handler
      });
  },

  // -------------------------------------------------
  // 🖥️ INDEX VIEW — Render the courses page or return JSON
  // -------------------------------------------------
  indexView: (req, res) => {
    if (req.query.format === "json") {
      // If requested as JSON (e.g. API call)
      res.json(res.locals.courses);
    } else {
      // Otherwise, render the EJS page
      res.render("courses/index", { courses: res.locals.courses });
    }
  },

  // -------------------------------------------------
  // 🆕 NEW — Render the form to create a new course
  // -------------------------------------------------
  new: (req, res) => {
    res.render("courses/new"); // Display new course form
  },

  // -------------------------------------------------
  // ✳️ CREATE — Add a new course to the database
  // -------------------------------------------------
  create: (req, res, next) => {
    let courseParams = {
      title: req.body.title, // Course title from form input
      description: req.body.description, // Description
      items: req.body.items.split(","), // Convert comma-separated items into an array
      zipCode: req.body.zipCode // Course location (example field)
    };

    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = "/courses"; // After creation, redirect to courses list
        res.locals.course = course; // Save course for next middleware
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  // -------------------------------------------------
  // 🔍 SHOW — Find and display a single course by ID
  // -------------------------------------------------
  show: (req, res, next) => {
    let courseId = req.params.id;

    Course.findById(courseId)
      .then(course => {
        res.locals.course = course; // Store the found course
        next(); // Proceed to showView
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------------------------------------
  // 🪟 SHOW VIEW — Render a single course detail page
  // -------------------------------------------------
  showView: (req, res) => {
    res.render("courses/show", { course: res.locals.course });
  },

  // -------------------------------------------------
  // ✏️ EDIT — Render edit form for a specific course
  // -------------------------------------------------
  edit: (req, res, next) => {
    let courseId = req.params.id;

    Course.findById(courseId)
      .then(course => {
        res.render("courses/edit", { course: course }); // Preload form with course data
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------------------------------------
  // 🔁 UPDATE — Apply changes to an existing course
  // -------------------------------------------------
  update: (req, res, next) => {
    let courseId = req.params.id;
    let courseParams = {
      title: req.body.title,
      description: req.body.description,
      items: req.body.items.split(","),
      zipCode: req.body.zipCode
    };

    // Update course using Mongoose
    Course.findByIdAndUpdate(courseId, { $set: courseParams })
      .then(course => {
        // ✅ FIXED redirect path formatting
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------------------------------------
  // ❌ DELETE — Remove a course from the database
  // -------------------------------------------------
  delete: (req, res, next) => {
    let courseId = req.params.id;

    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = "/courses"; // Redirect to course list after deletion
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },

  // -------------------------------------------------
  // 🔄 REDIRECT VIEW — Handles redirection logic centrally
  // -------------------------------------------------
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;

    if (redirectPath !== undefined) {
      res.redirect(redirectPath);
    } else {
      next(); // Continue if no redirect path defined
    }
  }
};
