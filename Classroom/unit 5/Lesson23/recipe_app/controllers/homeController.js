"use strict"; // Enforces strict mode for cleaner and more secure JavaScript

// ----------------------------
// ✅ HOME CONTROLLER
// ----------------------------
// Handles basic, non-database pages like the homepage and contact page.

module.exports = {
  // ----------------------------
  // ✅ Renders the contact/subscription page
  // ----------------------------
  getSubscriptionPage: (req, res) => {
    // Renders the "contact.ejs" view located in the 'views' folder
    res.render("contact");
  },

  // ----------------------------
  // ✅ Renders the home (index) page
  // ----------------------------
  index: (req, res) => {
    // Renders the "index.ejs" view
    res.render("index");
  },

  // ----------------------------
  // ✅ Middleware to log every incoming request path
  // ----------------------------
  logRequestPaths: (req, res, next) => {
    // Logs the URL path of each request made to the server (for debugging or tracking)
    console.log(`Request made to: ${req.url}`);
    // Moves on to the next middleware or route handler
    next();
  }
};
