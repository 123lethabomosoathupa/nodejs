// models/course.js
"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;
const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title required"],
            unique: true,
            trim: true
        },
        description: {
            type: String,
            default: "No description provided"
        },
        items: [String],
        zipCode: {
            type: Number,
            min: [10000, "Zip code too small"],
            max: [99999, "Zip code too large"]
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Course", courseSchema);