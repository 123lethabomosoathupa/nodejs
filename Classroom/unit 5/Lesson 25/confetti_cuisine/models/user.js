"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Import Mongoose Library ===
const mongoose = require('mongoose');

// === Define the Subscriber Schema ===
// The schema determines the structure of documents stored in the "subscribers" collection.
const subscriberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    zipCode: { type: Number, min: [10000, "Too short"], max: 99999 },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
}, { timestamps: true });
const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    maxStudents: { type: Number, default: 0, min: [0, "Cannot be negative"] },
    cost: { type: Number, default: 0, min: [0, "Cannot be negative"] }
}, { timestamps: true });

// === Export the Subscriber Model ===
// Creates a Mongoose model named "Subscriber" using the schema above.
// Mongoose will automatically map this model to the "subscribers" collection in MongoDB.
module.exports = mongoose.model("Subscriber", subscriberSchema);
