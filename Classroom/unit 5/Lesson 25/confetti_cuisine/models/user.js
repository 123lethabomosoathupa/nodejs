"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Import Dependencies ===
const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

// === Define User Schema ===
const userSchema = new Schema(
  {
    name: {
      first: { type: String, trim: true },
      last: { type: String, trim: true },
    },
    email: { type: String, required: true, unique: true },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

// === Passport Authentication Plugin ===
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

// === Export User Model ===
module.exports = mongoose.model("User", userSchema);
