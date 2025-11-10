"use strict"; 
// Enforces strict mode for cleaner and safer JavaScript — prevents the use of undeclared variables.
 
// ----------------------------
// ✅ MODULE IMPORTS
// ----------------------------
const { body, validationResult } = require("express-validator"); 
// Import functions from express-validator to handle validation logic.

const User = require("../models/user"), 
// Import the User model for interacting with the "users" collection in MongoDB.

  passport = require("passport"), 
// Import Passport.js for user authentication (login, session management, etc.).

  // Helper function to extract and structure user data from the request body.
  getUserParams = body => {
    return {
      name: {
        first: body.first, // First name from form input
        last: body.last    // Last name from form input
      },
      email: body.email,   // Email address
      password: body.password, // Plain text password (will be hashed by Passport)
      zipCode: body.zipCode // Zip code from form input
    };
  };

// ----------------------------
// ✅ CONTROLLER EXPORTS
// ----------------------------
module.exports = {
  // ---------------------------------------------------
  // 🧭 GET: List all users
  // ---------------------------------------------------
  index: (req, res, next) => {
    User.find() // Find all users in the database
      .then(users => {
        res.locals.users = users; // Store users in response locals for later rendering
        next(); // Pass control to the next middleware or view renderer
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`); // Log any error
        next(error); // Pass error to next middleware
      });
  },

  // ---------------------------------------------------
  // 📄 RENDER: User list page or JSON format
  // ---------------------------------------------------
  indexView: (req, res) => {
    if (req.query.format === "json") {
      res.json(res.locals.users); // Return users as JSON if requested via query string
    } else {
      res.render("users/index", { // Otherwise, render the users/index.ejs view
        users: res.locals.users // Pass the users data to the template
      });
    }
  },

  // ---------------------------------------------------
  // 🆕 GET: Render new user registration form
  // ---------------------------------------------------
  new: (req, res) => {
    res.render("users/new"); // Render the new user form page
  },

  // ---------------------------------------------------
  // 🧑‍💻 POST: Create a new user
  // ---------------------------------------------------
  create: (req, res, next) => {
    if (req.skip) return next(); // If validation failed earlier, skip user creation

    let newUser = new User(getUserParams(req.body)); // Create a new User instance with form data

    // Register user with Passport.js (handles hashing and storage)
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `${user.fullName}'s account created successfully!`); // Success message
        res.locals.redirect = "/users"; // Redirect to user list
        next(); // Continue to redirect middleware
      } else {
        req.flash("error", `Failed to create user account because: ${error.message}.`); // Flash error
        res.locals.redirect = "/users/new"; // Redirect back to registration form
        next(); // Continue
      }
    });
  },

  // ---------------------------------------------------
  // 🔁 Middleware: Handle redirects after actions
  // ---------------------------------------------------
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect; // Retrieve redirect path if set
    if (redirectPath) res.redirect(redirectPath); // Redirect to the stored path
    else next(); // Otherwise, move on to the next middleware
  },

  // ---------------------------------------------------
  // 👤 GET: Show a single user by ID
  // ---------------------------------------------------
  show: (req, res, next) => {
    let userId = req.params.id; // Extract user ID from URL
    User.findById(userId) // Find the user by ID in the database
      .then(user => {
        res.locals.user = user; // Store user in response locals
        next(); // Pass control to view renderer
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`); // Log any error
        next(error); // Pass error to error handler
      });
  },

  // ---------------------------------------------------
  // 📄 RENDER: Show user details page
  // ---------------------------------------------------
  showView: (req, res) => {
    res.render("users/show"); // Render the show view (uses res.locals.user)
  },

  // ---------------------------------------------------
  // ✏️ GET: Render form to edit an existing user
  // ---------------------------------------------------
  edit: (req, res, next) => {
    let userId = req.params.id; // Get user ID from URL
    User.findById(userId) // Find the user in the database
      .then(user => {
        res.render("users/edit", { user: user }); // Render edit form with current data
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`); // Log error
        next(error); // Pass error to next middleware
      });
  },

  // ---------------------------------------------------
  // 🔄 PUT: Update an existing user’s info
  // ---------------------------------------------------
  update: (req, res, next) => {
    let userId = req.params.id, // Extract user ID
      userParams = { // Create updated user object
        name: {
          first: req.body.first,
          last: req.body.last
        },
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode
      };

    // Update the user in MongoDB
    User.findByIdAndUpdate(userId, { $set: userParams })
      .then(user => {
        res.locals.redirect = `/users/${userId}`; // Redirect to updated user’s page
        res.locals.user = user; // Store updated user
        next(); // Continue
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`); // Log error
        next(error); // Handle error
      });
  },

  // ---------------------------------------------------
  // ❌ DELETE: Remove a user from the database
  // ---------------------------------------------------
  delete: (req, res, next) => {
    let userId = req.params.id; // Extract user ID
    User.findByIdAndDelete(userId) // Delete user document
      .then(() => {
        res.locals.redirect = "/users"; // Redirect back to user list
        next(); // Continue
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`); // Log deletion error
        next(); // Move to next middleware
      });
  },

  // ---------------------------------------------------
  // 🔐 GET: Render login page
  // ---------------------------------------------------
  login: (req, res) => {
    res.render("users/login"); // Display login form
  },

  // ---------------------------------------------------
  // 🔑 POST: Authenticate user login via Passport.js
  // ---------------------------------------------------
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login", // Redirect if login fails
    failureFlash: "Failed to login.", // Show error message
    successRedirect: "/", // Redirect to home page if successful
    successFlash: "Logged in!" // Flash success message
  }),

  // ---------------------------------------------------
  // 🧾 VALIDATION: Middleware for checking form inputs
  // ---------------------------------------------------
  validate: [
    // Validate and sanitize email field
    body("email")
      .normalizeEmail({ all_lowercase: true }) // Convert to lowercase
      .trim() // Remove extra spaces
      .isEmail() // Check for valid email
      .withMessage("Email is invalid"),

    // Validate zip code field
    body("zipCode")
      .notEmpty().withMessage("Zip code cannot be empty") // Cannot be blank
      .isInt().withMessage("Zip code must be a number") // Must be numeric
      .isLength({ min: 5, max: 5 }).withMessage("Zip code must be 5 digits"), // Must be 5 digits

    // Validate password field
    body("password")
      .notEmpty().withMessage("Password cannot be empty"), // Required password

    // Final validation result middleware
    (req, res, next) => {
      const errors = validationResult(req); // Collect validation results
      if (!errors.isEmpty()) {
        let messages = errors.array().map(e => e.msg); // Extract error messages
        req.skip = true; // Skip user creation
        req.flash("error", messages.join(" and ")); // Display all errors via flash messages
        res.locals.redirect = "/users/new"; // Redirect to registration form
        next(); // Continue
      } else {
        next(); // Continue if no validation errors
      }
    }
  ],

  // ---------------------------------------------------
  // 🚪 LOGOUT: End user session and redirect to home
  // ---------------------------------------------------
  logout: (req, res, next) => {
    req.logout((err) => { // Passport’s logout function
      if (err) {
        return next(err); // Handle logout errors
      }
      req.flash("success", "You have been logged out!"); // Flash success message
      res.locals.redirect = "/"; // Redirect to home page
      next(); // Continue
    });
  },
};
