"use strict"; 
// Enforce strict mode for safer JavaScript coding

module.exports = {
  // Render the subscription/contact page
  getSubscriptionPage: (req, res) => {
    res.render("contact"); // Render the "contact" EJS template
  },

  // Render the home/index page
  index: (req, res) => {
    res.render("index"); // Render the "index" EJS template
  },

  // Middleware to log every request URL
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`); // Log the URL of the incoming request
    next(); // Pass control to the next middleware or route handler
  }
};
