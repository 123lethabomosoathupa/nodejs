"use strict"; 
// Enforce strict mode for safer JavaScript coding

const mongoose = require("mongoose"); 
// Import Mongoose library to define schema and interact with MongoDB

// Define the schema for Course collection
const courseSchema = new mongoose.Schema({
  title: {
    type: String,       // Data type: String
    required: true,     // Field is required
    unique: true        // Each course title must be unique
  },
  description: {
    type: String,       // Data type: String
    required: true      // Description is required
  },
  items: [],             // Array to store course items (no type enforced)
  zipCode: {
    type: Number,        // Data type: Number
    min: [10000, "Zip code too short"], // Minimum value validation with custom message
    max: 99999           // Maximum value allowed
  }
});

// Export the model so it can be used in controllers
module.exports = mongoose.model("Course", courseSchema);
