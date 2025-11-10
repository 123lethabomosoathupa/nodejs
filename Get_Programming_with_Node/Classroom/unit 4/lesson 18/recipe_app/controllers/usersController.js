"use strict"; // Enforce strict mode for safer JavaScript

// Import the User model
const User = require("../models/user");

module.exports = {
  // Controller to fetch all users from the database
  index: (req, res, next) => {
    User.find() // Find all users (no filter)
      .then(users => {
        res.locals.users = users; // Store users in res.locals for the view
        next(); // Pass control to next middleware (usually the view renderer)
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`); // Log any errors
        next(error); // Pass the error to error-handling middleware
      });
  },

  // Controller to render the users index view
  indexView: (req, res) => {
    res.render("users/index"); // Render EJS template at views/users/index.ejs
  }
};
