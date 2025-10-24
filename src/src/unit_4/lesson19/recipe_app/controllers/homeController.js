"use strict";

// Handles simple routes and request logging
module.exports = {
  // Log every request path
  logRequestPaths: (req, res, next) => {
    console.log(`➡️  Request made to: ${req.method} ${req.url}`);
    next();
  },

  // Render the homepage ("/")
  index: (req, res) => {
    res.render("index"); // make sure you have views/index.ejs
  },

  // Render the subscription/contact page ("/contact")
  getSubscriptionPage: (req, res) => {
    res.render("contact"); // make sure you have views/contact.ejs
  }
};
