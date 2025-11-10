"use strict"; // Enforce strict mode for safer JavaScript

module.exports = {
  // Controller to render the contact/subscription page
  getSubscriptionPage: (req, res) => {
    res.render("contact"); // Render the EJS template at views/contact.ejs
  },

  // Controller to render the home page
  index: (req, res) => {
    res.render("index"); // Render the EJS template at views/index.ejs
  },

  // Middleware to log each incoming request path
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`); // Log the URL of the incoming request
    next(); // Pass control to the next middleware or route handler
  }
};
