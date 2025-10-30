"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    maxStudents: { type: Number, default: 0, min: [0, "Cannot be negative"] },
    cost: { type: Number, default: 0, min: [0, "Cannot be negative"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
