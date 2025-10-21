"use strict";
const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    items: [String]
});
module.exports = mongoose.model("Course", courseSchema);