"use strict"; // Enforce strict mode for safer JavaScript

module.exports = {
  // Render the contact/subscription page
  getSubscriptionPage: (req, res) => {
    res.render("contact"); // Render EJS template at views/contact.ejs
  },

  // Render the home page
  index: (req, res) => {
    res.render("index"); // Render EJS template at views/index.ejs
  },

  // Middleware to log all incoming request paths
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`); // Log the request URL
    next(); // Pass control to next middleware or route
  }
};
