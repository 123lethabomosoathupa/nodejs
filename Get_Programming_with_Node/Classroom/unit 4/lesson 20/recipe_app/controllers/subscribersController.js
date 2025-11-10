"use strict"; // Enforce strict mode for safer JavaScript

// Import the Subscriber model
const Subscriber = require("../models/subscriber");

module.exports = {
  // --- FETCH ALL SUBSCRIBERS ---
  index: (req, res, next) => {
    Subscriber.find({}) // Find all subscribers (no filter)
      .then(subscribers => {
        res.locals.subscribers = subscribers; // Store subscribers in res.locals for access in the view
        next(); // Pass control to the next middleware (usually indexView)
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`); // Log error for debugging
        next(error); // Forward error to error-handling middleware
      });
  },

  // --- RENDER SUBSCRIBERS INDEX VIEW ---
  indexView: (req, res) => {
    res.render("subscribers/index"); // Render EJS template at views/subscribers/index.ejs
  },

  // --- SAVE A NEW SUBSCRIBER ---
  saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name, // Get name from form
      email: req.body.email, // Get email from form
      zipCode: req.body.zipCode // Get zip code from form
    });

    // Save the subscriber to the database
    newSubscriber
      .save()
      .then(result => {
        res.render("thanks"); // Render "thanks" page on successful save
      })
      .catch(error => {
        if (error) res.send(error); // Send error if saving fails
      });
  }
};
