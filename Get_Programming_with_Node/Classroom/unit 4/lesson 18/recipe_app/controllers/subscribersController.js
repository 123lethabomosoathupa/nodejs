"use strict"; // Enforce strict mode for safer JavaScript

// Import the Subscriber model
const Subscriber = require("../models/subscriber");

module.exports = {
  // Controller to fetch all subscribers from the database
  index: (req, res, next) => {
    Subscriber.find({}) // Find all subscribers (no filter)
      .then(subscribers => {
        res.locals.subscribers = subscribers; // Store in res.locals for use in view
        next(); // Call next middleware (usually the view renderer)
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`); // Log any errors
        next(error); // Pass the error to error-handling middleware
      });
  },

  // Controller to render the subscribers index view
  indexView: (req, res) => {
    res.render("subscribers/index"); // Render EJS template at views/subscribers/index.ejs
  },

  // Controller to save a new subscriber from form data
  saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name, // Get name from request body
      email: req.body.email, // Get email from request body
      zipCode: req.body.zipCode // Get zip code from request body
    });

    // Save the subscriber to MongoDB
    newSubscriber
      .save()
      .then(result => {
        res.render("thanks"); // Render "thanks" page after successful save
      })
      .catch(error => {
        if (error) res.send(error); // Send error if saving fails
      });
  }
};
