"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Import Mongoose Library ===
const mongoose = require('mongoose');

// === Define the Subscriber Schema ===
// The schema determines the structure of documents stored in the "subscribers" collection.
const subscriberSchema = mongoose.Schema({
    // Subscriber's full name
    name: String,

    // Subscriber's email address
    email: String,

    // Subscriber's postal or ZIP code
    zipCode: Number
});

// === Export the Subscriber Model ===
// Creates a Mongoose model named "Subscriber" using the schema above.
// Mongoose will automatically map this model to the "subscribers" collection in MongoDB.
module.exports = mongoose.model("Subscriber", subscriberSchema);
