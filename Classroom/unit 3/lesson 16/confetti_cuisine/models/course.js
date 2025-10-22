"use strict"; // Enforces strict mode for cleaner, safer JavaScript

// === Import Mongoose Library ===
const mongoose = require("mongoose");

// === Define the Course Schema ===
// The schema defines the structure of documents stored in the "courses" collection.
const courseSchema = new mongoose.Schema({
    // The title of the course (required field)
    title: {
        type: String,     // Must be a string
        required: true    // Cannot be empty — mandatory for every course
    },

    // A short description of what the course covers
    description: String,

    // A list of course items (e.g., topics, recipes, or lessons)
    items: [String] // An array of strings
});

// === Export the Model ===
// Creates and exports a Mongoose model named "Course" based on the schema above.
// Mongoose will automatically create/use the "courses" collection in MongoDB.
module.exports = mongoose.model("Course", courseSchema);
