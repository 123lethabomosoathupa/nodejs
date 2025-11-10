"use strict"; // Enforce strict mode for cleaner and safer JavaScript

const mongoose = require("mongoose"); // Import Mongoose library for MongoDB

// === Define Course Schema ===
// This schema defines the structure of a "Course" document in MongoDB
const courseSchema = new mongoose.Schema({
  // === Course Title ===
  title: {
    type: String,       // Data type is String
    required: true,     // This field is mandatory
    unique: true        // Ensure no two courses have the same title
  },

  // === Course Description ===
  description: {
    type: String,       // Data type is String
    required: true      // Description is required for every course
  },

  // === Items Array ===
  // Can store a list of sub-items, topics, or modules related to the course
  items: [],

  // === Zip Code ===
  zipCode: {
    type: Number,       // Numeric field
    min: [10000, "Zip code too short"], // Minimum valid 5-digit zip code
    max: 99999          // Maximum valid 5-digit zip code
  }
});

// === Export Course Model ===
// Enables importing the model elsewhere for CRUD operations
module.exports = mongoose.model("Course", courseSchema);
