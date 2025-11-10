"use strict"; 
// Enforces strict mode — helps catch common coding mistakes (e.g., using undeclared variables).

const mongoose = require("mongoose"); 
// Import Mongoose, a MongoDB object modeling library for Node.js that helps define schemas and interact with the database.

// ------------------------------------------------------
// 🧱 DEFINE COURSE SCHEMA
// ------------------------------------------------------
const courseSchema = new mongoose.Schema({
  // "title" field — required string and must be unique
  title: {
    type: String,        // The title must be text
    required: true,      // This field is mandatory
    unique: true         // No two courses can have the same title
  },

  // "description" field — short text about the course
  description: {
    type: String,        // The description must be text
    required: true       // It must be provided for each course
  },

  // "items" field — can store an array (like lessons, topics, or materials)
  items: [],             // Unspecified type array — flexible for mixed content

  // "zipCode" field — numeric value for the course location or region
  zipCode: {
    type: Number,        // Must be a number
    min: [10000, "Zip code too short"], // Minimum 5-digit number with custom error message
    max: 99999           // Maximum 5-digit number allowed
  }
});

// ------------------------------------------------------
// 🧩 EXPORT MODEL
// ------------------------------------------------------
module.exports = mongoose.model("Course", courseSchema); 
// Exports the Course model so it can be imported and used in controllers.
// This automatically creates a "courses" collection in MongoDB.
