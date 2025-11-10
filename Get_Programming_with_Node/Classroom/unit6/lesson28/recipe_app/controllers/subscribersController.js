"use strict"; 
// Enforce strict mode for safer JavaScript coding

const Subscriber = require("../models/subscriber"); 
// Import the Subscriber Mongoose model to interact with subscribers collection

module.exports = {
  // Fetch all subscribers from the database
  index: (req, res, next) => {
    Subscriber.find({}) // Find all subscribers
      .then(subscribers => {
        res.locals.subscribers = subscribers; // Store subscribers in res.locals for later middleware
        next(); // Pass control to next middleware
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`); // Log any errors
        next(error); // Pass error to error-handling middleware
      });
  },

  // Render the subscribers index view
  indexView: (req, res) => {
    res.render("subscribers/index"); // Render EJS template
  },

  // Save a new subscriber from POST request
  saveSubscriber: (req, res) => {
    console.log("Received POST request for subscribe:", req.body); // Log incoming form data
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });
    newSubscriber
      .save() // Save new subscriber to database
      .then(result => {
        res.render("thanks"); // Render thank-you page on success
      })
      .catch(error => {
        if (error) res.send(error); // Send error message if saving fails
      });
  },

  // Render new subscriber form
  new: (req, res) => {
    res.render("subscribers/new");
  },

  // Create a subscriber and prepare for redirect
  create: (req, res, next) => {
    let subscriberParams = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    };
    Subscriber.create(subscriberParams) // Save subscriber to DB
      .then(subscriber => {
        res.locals.redirect = "/subscribers"; // Set redirect path
        res.locals.subscriber = subscriber; // Store new subscriber
        next(); // Pass to next middleware
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  // Fetch a single subscriber by ID
  show: (req, res, next) => {
    let subscriberId = req.params.id; // Get subscriber ID from URL
    Subscriber.findById(subscriberId) // Find subscriber in DB
      .then(subscriber => {
        res.locals.subscriber = subscriber; // Store subscriber for later use
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // Render a single subscriber view
  showView: (req, res) => {
    res.render("subscribers/show"); // Render EJS template
  },

  // Render edit form for a subscriber
  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId) // Find subscriber to edit
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber // Pass subscriber data to edit form
        });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // Update a subscriber by ID
  update: (req, res, next) => {
    let subscriberId = req.params.id,
      subscriberParams = {
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
      };

    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams }) // Update subscriber in DB
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`; // Redirect to subscriber page
        res.locals.subscriber = subscriber; // Store updated subscriber
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // Delete a subscriber by ID
  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId) // Remove subscriber from DB
      .then(() => {
        res.locals.redirect = "/subscribers"; // Redirect to subscribers list
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next(); // Continue even if error occurs
      });
  },

  // Redirect middleware helper
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect; 
    if (redirectPath !== undefined) res.redirect(redirectPath); // Redirect if path exists
    else next(); // Otherwise, pass control to next middleware
  }
};
