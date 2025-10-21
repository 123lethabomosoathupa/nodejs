"use strict";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        first: { type: String, trim: true },
        last: { type: String, trim: true }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});
userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);