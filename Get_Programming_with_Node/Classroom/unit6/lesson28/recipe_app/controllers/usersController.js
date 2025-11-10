"use strict"; 
// Enforce strict mode for safer JavaScript coding

const token = process.env.TOKEN || "recipeT0k3n"; 
// Get TOKEN from environment variables or use default

const User = require("../models/user"), 
  // Import the User model for database interactions
  jsonWebToken = require("jsonwebtoken"), 
  // Import JWT for API authentication
  passport = require("passport"), 
  // Import Passport for authentication
  getUserParams = body => {
    // Helper function to extract user fields from request body
    return {
      name: {
        first: body.first, // First name from form input
        last: body.last    // Last name from form input
      },
      email: body.email,   // Email from form input
      password: body.password, // Password from form input
      zipCode: body.zipCode     // Zip code from form input
    };
  };

module.exports = {
  // Controller to fetch all users
  index: (req, res, next) => {
    User.find() // Query all users from database
      .then(users => {
        res.locals.users = users; // Store users in res.locals for next middleware
        next(); // Call next middleware
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`); // Log any error
        next(error); // Pass error to error-handling middleware
      });
  },

  // Render view for all users
  indexView: (req, res) => {
    res.render("users/index"); // Render EJS template for users index
  },

  // Render form for creating a new user
  new: (req, res) => {
    res.render("users/new"); // Render new user form
  },

  // Create a new user account
  create: (req, res, next) => {
    if (req.skip) next(); // Skip creation if validation failed
    let newUser = new User(getUserParams(req.body)); // Build new User object
    User.register(newUser, req.body.password, (error, user) => {
      // Register user using passport-local-mongoose
      if (user) {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users"; // Set redirect path
        next(); // Call next middleware
      } else {
        req.flash("error", `Failed to create user account because: ${error.message}.`);
        res.locals.redirect = "/users/new"; // Redirect back to new user form
        next(); // Call next middleware
      }
    });
  },

  // Middleware to handle redirect
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect; // Get redirect path
    if (redirectPath) res.redirect(redirectPath); // Redirect if defined
    else next(); // Continue to next middleware if not
  },

  // Fetch single user by ID
  show: (req, res, next) => {
    let userId = req.params.id; // Get user ID from route parameter
    User.findById(userId) // Query user by ID
      .then(user => {
        res.locals.user = user; // Store user in res.locals for next middleware
        next(); // Call next middleware
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`); // Log errors
        next(error); // Pass error to error handler
      });
  },

  // Render view for a single user
  showView: (req, res) => {
    res.render("users/show"); // Render EJS template for showing a user
  },

  // Render edit form for a user
  edit: (req, res, next) => {
    let userId = req.params.id; // Get user ID from route
    User.findById(userId) // Query user
      .then(user => {
        res.render("users/edit", { user: user }); // Render edit form with user data
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`); // Log error
        next(error); // Pass error to error handler
      });
  },

  // Update user by ID
  update: (req, res, next) => {
    let userId = req.params.id, 
      userParams = { // Build update object
        name: {
          first: req.body.first, // Updated first name
          last: req.body.last    // Updated last name
        },
        email: req.body.email,   // Updated email
        password: req.body.password, // Updated password
        zipCode: req.body.zipCode     // Updated zip code
      };
    User.findByIdAndUpdate(userId, { $set: userParams }) // Update user in DB
      .then(user => {
        res.locals.redirect = `/users/${userId}`; // Redirect to updated user page
        res.locals.user = user; // Store updated user
        next(); // Call next middleware
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`); // Log error
        next(error); // Pass error to error handler
      });
  },

  // Delete user by ID
  delete: (req, res, next) => {
    let userId = req.params.id; // Get user ID
    User.findByIdAndRemove(userId) // Remove user from DB
      .then(() => {
        res.locals.redirect = "/users"; // Redirect to users list
        next(); // Call next middleware
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`); // Log error
        next(); // Continue even if error occurs
      });
  },

  // Render login form
  login: (req, res) => {
    res.render("users/login"); // Render login EJS template
  },

  // Authenticate user using Passport
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login", // Redirect on failure
    failureFlash: "Failed to login.", // Flash message on failure
    successRedirect: "/", // Redirect on success
    successFlash: "Logged in!" // Flash message on success
  }),

  // Validate user input for new user creation
  validate: (req, res, next) => {
    req
      .sanitizeBody("email") // Sanitize email
      .normalizeEmail({ all_lowercase: true }) // Normalize email
      .trim(); // Remove whitespace
    req.check("email", "Email is invalid").isEmail(); // Validate email format
    req
      .check("zipCode", "Zip code is invalid") 
      .notEmpty() // Must not be empty
      .isInt()   // Must be an integer
      .isLength({ min: 5, max: 5 }) // Must be 5 digits
      .equals(req.body.zipCode); // Must match original
    req.check("password", "Password cannot be empty").notEmpty(); // Password required

    // Handle validation result
    req.getValidationResult().then(error => {
      if (!error.isEmpty()) { // If errors exist
        let messages = error.array().map(e => e.msg); // Collect messages
        req.skip = true; // Skip user creation
        req.flash("error", messages.join(" and ")); // Flash messages
        res.locals.redirect = "/users/new"; // Redirect back to form
        next();
      } else {
        next(); // Continue if no errors
      }
    });
  },

  // Logout user
  logout: (req, res, next) => {
    req.logout((err) => { // Passport logout
      if (err) return next(err); // Handle error
      req.flash("success", "You have been logged out!"); // Flash message
      res.locals.redirect = "/"; // Redirect home
      next(); // Call next middleware
    });
  },

  // Verify API token from query
  verifyToken: (req, res, next) => {
    let token = req.query.apiToken; // Get token from query
    if (token) {
      User.findOne({ apiToken: token }) // Look up user by token
        .then(user => {
          if (user) next(); // Continue if valid
          else next(new Error("Invalid API token.")); // Error if not found
        })
        .catch(error => next(new Error(error.message))); // Catch DB errors
    } else {
      next(new Error("Invalid API token.")); // No token provided
    }
  },

  // Authenticate API login and return JWT
  apiAuthenticate: (req, res, next) => {
    passport.authenticate("local", (errors, user) => {
      if (user) {
        let signedToken = jsonWebToken.sign(
          { data: user._id, exp: new Date().setDate(new Date().getDate() + 1) }, 
          "secret_encoding_passphrase" // Secret key for signing
        );
        res.json({ success: true, token: signedToken }); // Send token as JSON
      } else {
        res.json({ success: false, message: "Could not authenticate user." }); // Auth failed
      }
    })(req, res, next); // Call Passport middleware
  },

  // Verify JWT token in headers
  verifyJWT: (req, res, next) => {
    let token = req.headers.token; // Get token from headers
    if (token) {
      jsonWebToken.verify(token, "secret_encoding_passphrase", (errors, payload) => {
        if (payload) {
          User.findById(payload.data).then(user => { // Find user from payload
            if (user) next(); // Continue if user exists
            else res.status(httpStatus.FORBIDDEN).json({ error: true, message: "No User account found." });
          });
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({ error: true, message: "Cannot verify API token." });
          next();
        }
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({ error: true, message: "Provide Token" }); // No token provided
    }
  },
};
