// Import the Subscriber model to interact with MongoDB
const Subscriber = require('../models/subscriber');

// --- Fetch all subscribers and render the subscribers page ---
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({}) // Find all subscriber documents
        .exec() // Execute the query, returns a promise
        .then((subscribers) => {
            // On success, render 'subscribers' template and pass data
            res.render("subscribers", {
                subscribers: subscribers
            });
        })
        .catch((error) => {
            // Log any error that occurs during query
            console.log(error.message);
            return []; // Return empty array to continue promise chain
        })
        .then(() => {
            console.log("Promise Complete"); // Always executes at the end
        });
};

// --- Render subscription/contact page ---
exports.getSubscriptionPage = (req, res) => {
    res.render("contact"); // Render EJS template at views/contact.ejs
};

// --- Save a new subscriber from form submission ---
exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name, // Get name from submitted form
        email: req.body.email, // Get email from form
        zipCode: req.body.zipCode // Get zip code from form
    });

    newSubscriber.save() // Save the new subscriber to MongoDB
        .then((result) => {
            res.render("thanks"); // Render thank-you page on success
        })
        .catch((error) => {
            res.send(error); // Send error to client if saving fails
        });
};
