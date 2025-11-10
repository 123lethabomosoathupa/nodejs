"use strict"; 
// Enforces strict mode — helps catch common mistakes like undeclared variables.

const mongoose = require("mongoose"); 
// Import Mongoose to define schemas and interact with MongoDB.

// ------------------------------------------------------
// 🧱 DEFINE SUBSCRIBER SCHEMA
// ------------------------------------------------------
const subscriberSchema = new mongoose.Schema({
  // "name" field — required string
  name: {
    type: String,     // Must be a string
    required: true     // Field is mandatory
  },

  // "email" field — required string, stored in lowercase, must be unique
  email: {
    type: String,     // Must be a string
    required: true,   // Mandatory field
    lowercase: true,  // Convert to lowercase before saving
    unique: true      // No two subscribers can have the same email
  },

  // "zipCode" field — number used for location
  zipCode: {
    type: Number,                          // Must be numeric
    min: [10000, "Zip code too short"],    // Minimum 5-digit number
    max: 99999                             // Maximum 5-digit number
  },

  // "courses" field — array of references to Course documents
  courses: [{ 
    type: mongoose.Schema.Types.ObjectId,  // Stores ObjectId of Course
    ref: "Course"                          // Refers to the "Course" model
  }]
});

// ------------------------------------------------------
// 🧩 INSTANCE METHOD: Get subscriber info
// ------------------------------------------------------
subscriberSchema.methods.getInfo = function() {
  // Returns a formatted string with subscriber details
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

// ------------------------------------------------------
// 🧩 INSTANCE METHOD: Find local subscribers
// ------------------------------------------------------
subscriberSchema.methods.findLocalSubscribers = function() {
  // Finds all subscribers with the same zip code as this subscriber
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode }) // Query by zip code
    .exec();                        // Returns a promise
};

// ------------------------------------------------------
// 🧩 EXPORT MODEL
// ------------------------------------------------------
module.exports = mongoose.model("Subscriber", subscriberSchema); 
// Exports the Subscriber model to use in controllers or other parts of the app.
