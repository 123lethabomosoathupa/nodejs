"use strict"; // Enforce strict mode for safer JavaScript

// Import the User model
const User = require("../models/user");

module.exports = {
  // --- FETCH ALL USERS ---
  index: (req, res, next) => {
    User.find() // Find all users
      .then(users => {
        res.locals.users = users; // Store users in res.locals for view
        next(); // Pass to next middleware (indexView)
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error); // Forward error to error-handling middleware
      });
  },

  // Render users index page
  indexView: (req, res) => {
    res.render("users/index"); // Render EJS template at views/users/index.ejs
  },

  // --- SHOW NEW USER FORM ---
  new: (req, res) => {
    res.render("users/new"); // Render form to create a new user
  },

  // --- CREATE NEW USER ---
  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first, // Get first name from form
        last: req.body.last // Get last name from form
      },
      email: req.body.email, // Get email from form
      password: req.body.password, // Get password from form
      zipCode: req.body.zipCode // Get zip code from form
    };
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users"; // Redirect to users index after creation
        res.locals.user = user; // Store created user for potential use
        next(); // Call next middleware (redirectView)
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },

  // --- SHOW SINGLE USER ---
  show: (req, res, next) => {
    let userId = req.params.id; // Get user ID from URL
    User.findById(userId)
      .then(user => {
        res.locals.user = user; // Store user in res.locals
        next(); // Pass to next middleware (showView)
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  // Render single user view
  showView: (req, res) => {
    res.render("users/show"); // Render EJS template at views/users/show.ejs
  },

  // --- EDIT USER FORM ---
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", { user }); // Render edit form with existing user data
      })
      .catch(error => {
        console.log(`Error loading user for edit: ${error.message}`);
        next(error);
      });
  },

  // --- UPDATE USER ---
  update: (req, res, next) => {
    let userId = req.params.id;
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
    User.findByIdAndUpdate(userId, { $set: userParams }) // Update user fields
      .then(() => {
        res.locals.redirect = `/users/${userId}`; // Redirect to updated user's page
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },

  // --- DELETE USER ---
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId) // Remove user by ID
      .then(() => {
        res.locals.redirect = "/users"; // Redirect to users index after deletion
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next(error);
      });
  },

  // --- REDIRECT MIDDLEWARE ---
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect; // Get path from res.locals
    if (redirectPath) res.redirect(redirectPath); // Redirect if path exists
    else next(); // Otherwise, continue to next middleware
  }
};
