"use strict"; // Enable strict mode for safer JS (prevents some silent errors).

const User = require("../models/user"); // Import the Mongoose User model.

const { body, validationResult } = require("express-validator"); // Import express-validator helpers.

// Helper to map request body fields into the shape expected by the User model.
const getUserParams = (body) => {
  return {
    name: { // Group name into a nested object with first & last
      first: body.first, // Map body.first -> name.first
      last: body.last, // Map body.last -> name.last
    },
    email: body.email, // Map email field
    password: body.password, // Map password field
    zipCode: body.zipCode, // Map zipCode field
  };
};

module.exports = { // Export controller methods as an object
  index: (req, res, next) => { // Controller action to fetch all users
    User.find() // Query DB for all User documents
      .then((users) => { // On success...
        res.locals.users = users; // Store users in res.locals for next middleware/view
        next(); // Continue to next middleware (usually indexView)
      })
      .catch((error) => { // On error...
        console.log(`Error fetching users: ${error.message}`); // Log error message
        next(error); // Pass error to Express error handlers
      });
  },

  indexView: (req, res) => { // Render the users index view
    res.render("users/index", { // Render views/users/index.ejs
      flashMessages: { // Provide a flashMessages object to the template
        success: "Loaded all users!", // Example success message to show in UI
      },
    });
  },

  new: (req, res) => { // Render the "new user" form
    res.render("users/new"); // Render views/users/new.ejs
  },

  create: (req, res, next) => { // Create a new user in the DB
    let userParams = getUserParams(req.body); // Structure form data for the model

    User.create(userParams) // Insert new user document
      .then((user) => { // On success...
        req.flash("success", `${user.fullName}'s account created successfully!`); // Add success flash
        res.locals.redirect = "/users"; // Set redirect path after middleware finishes
        res.locals.user = user; // Store created user in res.locals
        next(); // Continue to redirectView
      })
      .catch((error) => { // On failure...
        console.log(`Error saving user: ${error.message}`); // Log the error
        res.locals.redirect = "/users/new"; // Set redirect path back to new form
        req.flash("error", `Failed to create user account because: ${error.message}.`); // Flash the error message
        next(); // Continue so redirectView can run
      });
  },

  redirectView: (req, res, next) => { // Middleware to perform redirects if res.locals.redirect is set
    let redirectPath = res.locals.redirect; // Read redirect path
    if (redirectPath) res.redirect(redirectPath); // If defined, send redirect response
    else next(); // Otherwise continue to next middleware
  },

  show: (req, res, next) => { // Fetch a single user by ID
    let userId = req.params.id; // Grab id param from the request URL
    User.findById(userId) // Query DB for the specific user
      .then((user) => { // On success...
        res.locals.user = user; // Store user in res.locals for next middleware/view
        next(); // Continue to showView
      })
      .catch((error) => { // On error...
        console.log(`Error fetching user by ID: ${error.message}`); // Log error
        next(error); // Pass error to error handlers
      });
  },

  showView: (req, res) => { // Render a single user's detail page
    res.render("users/show"); // Render views/users/show.ejs (uses res.locals.user)
  },

  edit: (req, res, next) => { // Render edit form for an existing user
    let userId = req.params.id; // Get user id from URL
    User.findById(userId) // Find user by id
      .then((user) => { // On success...
        res.render("users/edit", { user }); // Render edit view and pass user object
      })
      .catch((error) => { // On error...
        console.log(`Error fetching user by ID: ${error.message}`); // Log error
        next(error); // Forward error
      });
  },

  update: (req, res, next) => { // Apply updates to a user document
    let userId = req.params.id, // Get id from URL
      userParams = { // Build update object from form body
        name: {
          first: req.body.first, // New first name
          last: req.body.last, // New last name
        },
        email: req.body.email, // New email
        password: req.body.password, // New password
        zipCode: req.body.zipCode, // New zip code
      };
    User.findByIdAndUpdate(userId, { // Update the user document in DB
      $set: userParams, // Set fields to new values
    })
      .then((user) => { // On success...
        res.locals.redirect = `/users/${userId}`; // Redirect to the user's show page
        res.locals.user = user; // Store the (pre-update) user in res.locals
        next(); // Continue (redirectView will handle the redirect)
      })
      .catch((error) => { // On error...
        console.log(`Error updating user by ID: ${error.message}`); // Log the error
        next(error); // Forward error
      });
  },

  delete: (req, res, next) => { // Delete a user by ID
    let userId = req.params.id; // Get id from URL
    User.findByIdAndRemove(userId) // Remove the document from DB
      .then(() => { // On success...
        res.locals.redirect = "/users"; // Redirect back to users list
        next(); // Continue to redirectView
      })
      .catch((error) => { // On error...
        console.log(`Error deleting user by ID: ${error.message}`); // Log error
        next(); // Continue (you might forward error here instead)
      });
  },

  login: (req, res) => { // Render the login page
    res.render("users/login"); // Render views/users/login.ejs
  },

  authenticate: (req, res, next) => { // Check user credentials and set redirect/flash
    User.findOne({ email: req.body.email }) // Find a user by email
      .then(user => { // On success (user found or not)
        if (user) { // If a user with that email exists...
          user.passwordComparison(req.body.password) // Compare provided password with stored hash
            .then(passwordsMatch => { // passwordComparison returns a promise
              if (passwordsMatch) { // If passwords match...
                req.flash("success", `${user.fullName} logged in successfully!`); // Set success flash
                res.locals.redirect = `/users/${user._id}`; // Redirect to user's profile
              } else { // If password is incorrect...
                req.flash("error", "Incorrect password."); // Set error flash
                res.locals.redirect = "/users/login"; // Redirect back to login page
              }
              next(); // Continue (redirectView will handle redirect)
            });
        } else { // No user found with that email
          req.flash("error", "User not found."); // Flash user-not-found error
          res.locals.redirect = "/users/login"; // Redirect back to login form
          next(); // Continue to redirectView
        }
      })
      .catch(error => { // If DB query or password comparison fails
        console.log(`Error logging in user: ${error.message}`); // Log the error
        next(error); // Forward error to error handlers
      });
  },

}; // End of module.exports object

// ----------------------------
// Validation middleware exported separately
// ----------------------------

exports.validate = [ // Array of validation middleware to use in routes
  body("email").isEmail().withMessage("Email must be valid"), // Email must be valid
  body("zipCode").isPostalCode("any").withMessage("Invalid zip code"), // Zip code validation
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"), // Password length check
  (req, res, next) => { // Final middleware to handle validation results
    const errors = validationResult(req); // Gather validation errors
    if (!errors.isEmpty()) { // If there are errors...
      req.flash("error", errors.array().map(e => e.msg).join(" ")); // Flash combined error messages
      res.locals.redirect = "/users/new"; // Redirect back to the new user form
      next(); // Continue so redirectView can perform the redirect
    } else next(); // No validation errors — continue to next middleware
  }
];
