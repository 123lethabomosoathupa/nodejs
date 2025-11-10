// models/course.js

"use strict"; // Enforce strict mode for safer JavaScript

const mongoose = require("mongoose"); // Import Mongoose library
const { Schema } = mongoose; // Destructure Schema constructor from mongoose

// Define the schema for Course
const courseSchema = new Schema(
    {
        title: { // Field for course title
            type: String, // Data type is String
            required: [true, "Title required"], // Title is required; custom error message
            unique: true, // Title must be unique in the database
            trim: true // Remove whitespace from both ends of the string
        },
        description: { // Field for course description
            type: String, // Data type is String
            default: "No description provided" // Default value if not provided
        },
        items: [String], // Array of strings, e.g., topics or modules in the course
        zipCode: { // Field for associated zip code (optional)
            type: Number, // Data type is Number
            min: [10000, "Zip code too small"], // Minimum allowed value
            max: [99999, "Zip code too large"] // Maximum allowed value
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Export the model so it can be used in other parts of the app
module.exports = mongoose.model("Course", courseSchema);
