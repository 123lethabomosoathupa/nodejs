"use strict"; 
// Enforce strict mode to catch common JavaScript errors and prevent unsafe practices

const Course = require("../models/course"); 
// Import the Course Mongoose model to interact with courses collection in MongoDB
const httpStatus = require("http-status-codes"); 
// Import HTTP status codes for standardized responses
const User = require("../models/user"); 
// Import the User Mongoose model to interact with users collection in MongoDB

module.exports = {
  // Controller action to fetch all courses
  index: (req, res, next) => {
    Course.find({}) // Find all courses
      .then(courses => {
        res.locals.courses = courses; // Store courses in res.locals for later middleware
        next(); // Call next middleware
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`); // Log any errors
        next(error); // Pass error to error-handling middleware
      });
  },

  // Render view for all courses
  indexView: (req, res) => {
    // Could return JSON if needed:
    // if (req.query.format === "json") {
    //   res.json(res.locals.courses);
    // } else {
    //   res.render("courses/index");
    // }
    res.render("courses/index"); // Render EJS view for courses
  },

  // Render form for creating a new course
  new: (req, res) => {
    res.render("courses/new");
  },

  // Handle creation of a new course
  create: (req, res, next) => {
    let courseParams = {
      title: req.body.title, // Title from form input
      description: req.body.description, // Description from form input
      items: [req.body.items.split(",")], // Convert comma-separated string into array
      zipCode: req.body.zipCode // Zip code from form input
    };
    Course.create(courseParams) // Create new course in database
      .then(course => {
        res.locals.redirect = "/courses"; // Set redirect path after success
        res.locals.course = course; // Save the created course for later middleware
        next(); // Call next middleware
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error); // Pass error to error handler
      });
  },

  // Fetch a single course by ID
  show: (req, res, next) => {
    let courseId = req.params.id; // Extract course ID from URL
    Course.findById(courseId) // Find course by ID
      .then(course => {
        res.locals.course = course; // Store course in locals for rendering
        next(); // Call next middleware
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error); // Pass error to error handler
      });
  },

  // Render view for a single course
  showView: (req, res) => {
    res.render("courses/show"); // Render EJS template
  },

  // Render edit form for a course
  edit: (req, res, next) => {
    let courseId = req.params.id; // Get course ID from URL
    Course.findById(courseId) // Find course in database
      .then(course => {
        res.render("courses/edit", {
          course: course // Pass course data to EJS view
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error); // Pass error to error handler
      });
  },

  // Update a course by ID
  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = {
        title: req.body.title,
        description: req.body.description,
        items: [req.body.items.split(",")],
        zipCode: req.body.zipCode
      };

    Course.findByIdAndUpdate(courseId, { $set: courseParams }) // Update course in DB
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`; // Redirect to updated course page
        res.locals.course = course; // Save updated course in locals
        next(); // Call next middleware
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error); // Pass error to error handler
      });
  },

  // Delete a course by ID
  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId) // Remove course from DB
      .then(() => {
        res.locals.redirect = "/courses"; // Redirect to courses list
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next(); // Pass error to error handler
      });
  },

  // Redirect helper middleware
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath); // Redirect if path is set
    else next(); // Otherwise, call next middleware
  },

  // Respond with JSON data
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK, // HTTP 200
      // Send res.locals data (courses, course, etc.) as JSON instead of rendering EJS
      data: res.locals
    });
  },

  // Handle errors in JSON API
  errorJSON: (error, req, res, next) => {
    let errorObject;

    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR, // HTTP 500
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error"
      };
    }
    res.json(errorObject); // Send error response as JSON
  },

  // Add the current user to a course (join)
  join: (req, res, next) => {
    let courseId = req.params.id;
    let currentUser = req.user;

    if (currentUser) { // Check if user is logged in
      User.findByIdAndUpdate(currentUser, {
        $addToSet: { courses: courseId } // Add course ID to user's courses array if not already added
      })
      .then(() => {
        res.locals.success = true; // Flag success
        next();
      })
      .catch(error => {
        next(error); // Pass error to error handler
      });
    } else {
      next(new Error("User must login first")); // Throw error if not logged in
    }
  },

  // Mark courses the user has already joined
  filterUserCourses: (req, res, next) => {
    let currentUser = res.locals.currentUser;

    if (currentUser) { // Check if user is logged in
      let mappedCourses = res.locals.courses.map((course) => {
        // Check if user has already joined the course
        let userJoined = currentUser.courses.some((userCourse) => {
          return userCourse.equals(course._id); // Compare course IDs
        });
        return Object.assign(course.toObject(), { joined: userJoined }); // Add joined property
      });
      res.locals.courses = mappedCourses; // Save mapped courses in locals
      next();
    } else {
      next(); // If not logged in, continue without filtering
    }
  }
};
