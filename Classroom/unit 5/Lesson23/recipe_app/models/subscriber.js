"use strict"; // Enforce strict mode for safer JavaScript

const mongoose = require("mongoose");

// === Define Subscriber Schema ===
// Represents a subscriber in the database
const subscriberSchema = new mongoose.Schema({
  // === Subscriber Name ===
  // Required string field
  name: {
    type: String,
    required: true // Every subscriber must have a name
  },

  // === Subscriber Email ===
  // Required, unique, and stored in lowercase
  email: {
    type: String,
    required: true,
    lowercase: true, // Store email in lowercase to avoid duplicates
    unique: true      // Ensure no two subscribers have the same email
  },

  // === Subscriber Zip Code ===
  // Number field with validation for 5-digit US zip codes
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"], // Minimum valid 5-digit zip code
    max: 99999                           // Maximum valid 5-digit zip code
  },

  // === Courses Subscribed To ===
  // Array of ObjectIds referencing the Course model
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

// === Instance Method: getInfo ===
// Returns a formatted string with the subscriber's basic information
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

// === Instance Method: findLocalSubscribers ===
// Finds other subscribers with the same zip code
subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber") // Access the Subscriber model
    .find({ zipCode: this.zipCode }) // Query for same zip code
    .exec(); // Return a promise
};

// === Export Subscriber Model ===
// Allows importing the model for use in controllers and other parts of the app
module.exports = mongoose.model("Subscriber", subscriberSchema);
