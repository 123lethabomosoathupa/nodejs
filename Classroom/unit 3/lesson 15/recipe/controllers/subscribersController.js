"use strict";
const Subscriber = require("../models/subscriber");
// Render the contact form page
exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};
// Save a new subscriber
exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    newSubscriber
        .save()
        .then(result => {
            console.log("■ Subscriber saved:", result);
            res.render("thanks");
        })
        .catch(error => {
            console.error("■ Error saving subscriber:", error);
            res.send(error);
        });
};
// Display all subscribers
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
        .exec()
        .then(subscribers => {
            res.render("subscribers", { subscribers: subscribers });
        })
        .catch(error => {
            console.error(error.message);
            res.send(error);
        });
};
