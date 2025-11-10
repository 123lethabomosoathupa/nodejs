"use strict"; // Enforce strict mode for cleaner, more reliable code

// Import the Subscriber model (Mongoose schema for MongoDB)
const Subscriber = require("../models/subscriber");

module.exports = {
  // ----------------------------
  // ✅ INDEX: Retrieve all subscribers
  // ----------------------------
  index: (req, res, next) => {
    Subscriber.find({}) // Find all subscribers in the database
      .then(subscribers => {
        res.locals.subscribers = subscribers; // Store data for the next middleware/view
        next(); // Proceed to indexView
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error); // Pass error to global handler
      });
  },

  // ----------------------------
  // ✅ INDEX VIEW: Render list of subscribers
  // ----------------------------
  indexView: (req, res) => {
    res.render("subscribers/index"); // Render the 'index.ejs' page in the subscribers folder
  },

  // ----------------------------
  // ✅ SAVE SUBSCRIBER: From the contact page (simple form)
  // ----------------------------
  saveSubscriber: (req, res) => {
    // Create a new Subscriber object using form data
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });

    // Save the new subscriber to the database
    newSubscriber
      .save()
      .then(result => {
        // After saving, render a thank-you page
        res.render("thanks");
      })
      .catch(error => {
        if (error) res.send(error); // Send error response if something goes wrong
      });
  },

  // ----------------------------
  // ✅ NEW: Render the form to add a new subscriber
  // ----------------------------
  new: (req, res) => {
    res.render("subscribers/new"); // Renders the 'new.ejs' form
  },

  // ----------------------------
  // ✅ CREATE: Save a new subscriber (used in /create route)
  // ----------------------------
  create: (req, res, next) => {
    // Extract and structure subscriber data from the form
    let subscriberParams = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    };

    // Create a new document in MongoDB
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers"; // Redirect path after success
        res.locals.subscriber = subscriber; // Store subscriber data for use in redirect
        next(); // Proceed to redirectView
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  // ----------------------------
  // ✅ SHOW: Find and display one subscriber by ID
  // ----------------------------
  show: (req, res, next) => {
    let subscriberId = req.params.id; // Get ID from the URL
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber; // Store subscriber for the next middleware
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // ----------------------------
  // ✅ SHOW VIEW: Render a page showing one subscriber
  // ----------------------------
  showView: (req, res) => {
    res.render("subscribers/show"); // Render the single subscriber page
  },

  // ----------------------------
  // ✅ EDIT: Render a form to edit a specific subscriber
  // ----------------------------
  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        // Render the edit form with current subscriber data pre-filled
        res.render("subscribers/edit", {
          subscriber: subscriber
        });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // ----------------------------
  // ✅ UPDATE: Apply changes to an existing subscriber
  // ----------------------------
  update: (req, res, next) => {
    let subscriberId = req.params.id,
      subscriberParams = {
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
      };

    // Find subscriber and update fields with new data
    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams
    })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`; // Redirect to the updated subscriber’s page
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // ----------------------------
  // ✅ DELETE: Remove subscriber from the database
  // ----------------------------
  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers"; // After deletion, go back to list
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  },

  // ----------------------------
  // ✅ REDIRECT VIEW: Handles route redirection logic
  // ----------------------------
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath); // Redirect if path set
    else next(); // Otherwise move on
  }
};
