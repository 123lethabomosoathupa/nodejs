"use strict";

const Subscriber = require("../models/subscriber"); // Import Subscriber model

// ========================
// Get All Subscribers
// ========================
/**
 * Retrieves all subscriber documents from the database
 * and renders them in the 'subscribers' view.
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 */
exports.getAllSubscribers = (req, res) => {
  Subscriber.find({}) // Find all Subscriber documents
    .exec() // Execute query and return a promise
    .then((subscribers) => {
      // On successful query, render the 'subscribers' EJS template
      res.render("subscribers", {
        subscribers: subscribers, // Pass subscribers data to template
      });
    })
    .catch((error) => {
      console.log(error.message); // Log any errors
      return []; // Return empty array in case of error
    })
    .then(() => {
      console.log("Promise Complete"); // Always log when promise chain completes
    });
};

// ========================
// Get Subscription Page
// ========================
/**
 * Renders the subscription/contact page where users can sign up.
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 */
exports.getSubscriptionPage = (req, res) => {
  res.render("contact"); // Render the 'contact.ejs' template
};

// ========================
// Save a New Subscriber
// ========================
/**
 * Saves a new subscriber to the database based on form submission.
 * Renders a thank-you page upon successful save.
 * @param {Request} req - The HTTP request
 * @param {Response} res - The HTTP response
 */
exports.saveSubscriber = (req, res) => {
  // Create a new Subscriber instance using form data
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode,
  });

  // Save the subscriber to the database
  newSubscriber
    .save()
    .then((result) => {
      res.render("thanks"); // Render thank-you page on success
    })
    .catch((error) => {
      res.send(error); // Send error to client if saving fails
    });
};

/*
  SUMMARY:
  1. getAllSubscribers: Fetches all subscribers from MongoDB and renders the 'subscribers' view.
  2. getSubscriptionPage: Renders the subscription form page for users to sign up.
  3. saveSubscriber: Saves a new subscriber document to the database and renders a thank-you page.
  
  These functions are intended to be used as route handlers in an Express app
  for managing subscriber data.
*/
