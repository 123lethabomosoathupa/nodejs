"use strict"; // ✅ Enforce strict mode for cleaner, safer JavaScript

// -------------------------
// Import Subscriber Model
// -------------------------
const Subscriber = require("../models/subscriber");

// -------------------------
// Controller Export
// -------------------------
// This controller handles all CRUD operations (Create, Read, Update, Delete)
// and page rendering for the Subscribers feature.

module.exports = {
  // -------------------------------------------------
  // 🧾 INDEX — Fetch and list all subscribers
  // -------------------------------------------------
  index: (req, res, next) => {
    Subscriber.find({})
      .then(subscribers => {
        res.locals.subscribers = subscribers; // Store subscriber list for next middleware/view
        next(); // Pass control to indexView
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error); // Forward the error to the global handler
      });
  },

  // -------------------------------------------------
  // 🖥️ INDEX VIEW — Render all subscribers page
  // -------------------------------------------------
  indexView: (req, res) => {
    // Renders the 'views/subscribers/index.ejs' file
    res.render("subscribers/index");
  },

  // -------------------------------------------------
  // ✉️ SAVE SUBSCRIBER — Handle direct form submissions (simple route)
  // -------------------------------------------------
  saveSubscriber: (req, res) => {
    // Create a new Subscriber object using form data
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });

    // Save the new subscriber to MongoDB
    newSubscriber
      .save()
      .then(result => {
        // Render a “Thank You” page after successful subscription
        res.render("thanks");
      })
      .catch(error => {
        if (error) res.send(error); // Send error directly (not ideal for production)
      });
  },

  // -------------------------------------------------
  // 🆕 NEW — Render a form to add a new subscriber
  // -------------------------------------------------
  new: (req, res) => {
    res.render("subscribers/new"); // Show the form page
  },

  // -------------------------------------------------
  // ✳️ CREATE — Add a new subscriber (used with POST /subscribers)
  // -------------------------------------------------
  create: (req, res, next) => {
    let subscriberParams = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    };

    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers"; // Redirect path after success
        res.locals.subscriber = subscriber; // Store the new subscriber
        next(); // Pass control to redirectView
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  // -------------------------------------------------
  // 🔍 SHOW — Display a single subscriber’s details
  // -------------------------------------------------
  show: (req, res, next) => {
    let subscriberId = req.params.id;

    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber; // Store found subscriber
        next(); // Continue to showView
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------------------------------------
  // 🪟 SHOW VIEW — Render details of a single subscriber
  // -------------------------------------------------
  showView: (req, res) => {
    res.render("subscribers/show"); // Render the “show” page using stored subscriber data
  },

  // -------------------------------------------------
  // ✏️ EDIT — Render the edit form for a subscriber
  // -------------------------------------------------
  edit: (req, res, next) => {
    let subscriberId = req.params.id;

    Subscriber.findById(subscriberId)
      .then(subscriber => {
        // Render the edit page and prefill with subscriber data
        res.render("subscribers/edit", { subscriber: subscriber });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------------------------------------
  // 🔁 UPDATE — Update subscriber information
  // -------------------------------------------------
  update: (req, res, next) => {
    let subscriberId = req.params.id;
    let subscriberParams = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    };

    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`; // Redirect to updated subscriber’s page
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------------------------------------
  // ❌ DELETE — Remove a subscriber from the database
  // -------------------------------------------------
  delete: (req, res, next) => {
    let subscriberId = req.params.id;

    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers"; // Go back to subscriber list
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  },

  // -------------------------------------------------
  // 🔄 REDIRECT VIEW — Centralized redirect logic
  // -------------------------------------------------
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) {
      res.redirect(redirectPath);
    } else {
      next(); // Continue to next middleware if no redirect defined
    }
  }
};
