"use strict"; 
// Enforce strict mode for safer JavaScript coding

const mongoose = require("mongoose"); 
// Import Mongoose to define schema and interact with MongoDB

// Define the schema for Subscriber collection
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,   // Data type: String
    required: true  // Name is required
  },
  email: {
    type: String,       // Data type: String
    required: true,     // Email is required
    lowercase: true,    // Convert email to lowercase before saving
    unique: true        // Email must be unique
  },
  zipCode: {
    type: Number,       // Data type: Number
    min: [10000, "Zip code too short"], // Minimum validation with custom message
    max: 99999          // Maximum allowed value
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] 
  // Array of ObjectIds referencing Course collection (many-to-many relationship)
});

// Instance method to get basic subscriber info
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

// Instance method to find other subscribers in the same zip code
subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber") // Access Subscriber model
    .find({ zipCode: this.zipCode }) // Query subscribers with same zip code
    .exec(); // Return a promise
};

// Export the Subscriber model for use in controllers
module.exports = mongoose.model("Subscriber", subscriberSchema);
