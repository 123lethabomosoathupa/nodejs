"use strict";

const Subscriber = require("../models/subscriber");

// Helper function to get subscriber params
const getSubscriberParams = (body) => ({
  name: body.name,
  email: body.email,
  zipCode: body.zipCode
});

module.exports = {
  // === List all subscribers ===
  index: (req, res, next) => {
    Subscriber.find()
      .then((subscribers) => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },

  // === Render index view for subscribers ===
  indexView: (req, res) => {
    res.render("subscribers/index", { subscribers: res.locals.subscribers });
  },

  // === Render new subscriber form ===
  new: (req, res) => {
    res.render("subscribers/new");
  },

  // === Create a new subscriber ===
 // === Create a new subscriber ===
create: (req, res, next) => {
  const subscriberParams = getSubscriberParams(req.body);
  Subscriber.create(subscriberParams)
    .then((subscriber) => {
      req.flash("success", "Subscriber created successfully!");
      res.locals.redirect = "/subscribers";
      res.locals.subscriber = subscriber;
      next();
    })
    .catch((error) => {
      console.log(`Error creating subscriber: ${error.message}`);
      
      // Handle duplicate email error
      if (error.code === 11000) {
        req.flash("error", "Email address is already registered.");
      } else if (error.name === "ValidationError") {
        // Handle validation errors
        const messages = Object.values(error.errors).map(e => e.message);
        req.flash("error", messages.join(", "));
      } else {
        req.flash("error", `Failed to create subscriber: ${error.message}`);
      }
      
      res.locals.redirect = "/subscribers/new";
      next();
    });
},

  // === Redirect helper ===
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  // === Show a subscriber by ID ===
  show: (req, res, next) => {
    const subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // === Render single subscriber view ===
  showView: (req, res) => {
    res.render("subscribers/show", { subscriber: res.locals.subscriber });
  },

  // === Render edit form for a subscriber ===
  edit: (req, res, next) => {
    const subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        res.render("subscribers/edit", { subscriber });
      })
      .catch((error) => {
        console.log(`Error fetching subscriber for edit: ${error.message}`);
        next(error);
      });
  },

  // === Update a subscriber ===
  update: (req, res, next) => {
    const subscriberId = req.params.id;
    const subscriberParams = getSubscriberParams(req.body);

    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams })
      .then((subscriber) => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error updating subscriber: ${error.message}`);
        next(error);
      });
  },

  // === Delete a subscriber ===
  delete: (req, res, next) => {
    const subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting subscriber: ${error.message}`);
        next();
      });
  }
};
