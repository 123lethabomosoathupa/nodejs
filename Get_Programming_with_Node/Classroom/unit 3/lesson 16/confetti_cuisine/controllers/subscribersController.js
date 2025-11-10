"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Import Subscriber Model ===
const Subscriber = require('../models/subscriber');

// === Controller: Get All Subscribers ===
// Retrieves all subscriber documents from the database
// and renders the "subscribers.ejs" page with the results.
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})          // Query all subscribers
        .exec()                  // Execute the query
        .then((subscribers) => { // Handle the successful query
            res.render("subscribers", { 
                subscribers: subscribers // Pass data to the EJS template
            });
        })
        .catch((error) => {      // Handle errors
            console.log(error.message);
            return [];            // Return an empty array on error
        })
        .then(() => {             // This runs regardless of success or failure
            console.log("Promise Complete");
        });
};

// === Controller: Render Subscription Form Page ===
// Displays the "contact.ejs" page with the subscription form
exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

// === Controller: Save a New Subscriber ===
// Handles POST requests from the subscription form
// Creates a new Subscriber document and saves it to the database
exports.saveSubscriber = (req, res) => {
    // Create a new Subscriber based on form input
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    // Save the subscriber document to MongoDB
    newSubscriber.save()
        .then((result) => {
            // If successful, render the thank-you page
            res.render("thanks");
        })
        .catch((error) => {
            // Log and send any errors to the client
            res.send(error);
        });
};
