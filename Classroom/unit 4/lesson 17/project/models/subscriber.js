// models/subscriber.js

"use strict"; // Enforce strict mode for safer JavaScript

const mongoose = require("mongoose"); // Import Mongoose library
const { Schema } = mongoose; // Destructure Schema constructor from mongoose

// Define the schema for Subscriber
const subscriberSchema = new Schema(
    {
        name: { // Field for subscriber's name
            type: String, // Data type is String
            required: [true, "Name is required"], // Name is required; custom error message
            trim: true // Remove whitespace from both ends of the string
        },
        email: { // Field for subscriber's email
            type: String, // Data type is String
            required: [true, "Email is required"], // Email is required
            lowercase: true, // Convert email to lowercase before saving
            unique: true, // Email must be unique in the database
            match: [/.+@.+\..+/, "Please enter a valid email address"] // Regex to validate email format
        },
        zipCode: { // Field for subscriber's zip code
            type: Number, // Data type is Number
            required: [true, "Zip Code required"], // Zip code is required
            min: [10000, "Zip Code too short"], // Minimum allowed value
            max: [99999, "Zip Code too long"] // Maximum allowed value
        },
        courses: [{ type: Schema.Types.ObjectId, ref: "Course" }] 
        // Array of course references (one-to-many relationship with Course model)
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Instance method to get subscriber information as a formatted string
subscriberSchema.methods.getInfo = function () {
    return `Name: ${this.name} | Email: ${this.email} | Zip Code: ${this.zipCode}`;
};

// Static method to find subscribers by zip code
subscriberSchema.statics.findByZip = function (zip) {
    return this.find({ zipCode: zip }); // Returns all subscribers matching the zip code
};

// Export the model so it can be used in other parts of the app
module.exports = mongoose.model("Subscriber", subscriberSchema);
