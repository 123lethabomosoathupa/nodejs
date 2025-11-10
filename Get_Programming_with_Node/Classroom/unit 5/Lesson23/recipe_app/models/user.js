"use strict"; // Enforce strict mode for safer, cleaner JavaScript

// === Import Dependencies ===
const bcrypt = require("bcrypt"); // Library for hashing passwords securely
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Subscriber = require("./subscriber"); // Subscriber model for linking accounts

// === Define User Schema ===
// Represents a user in the application
const userSchema = new Schema(
  {
    // === User Name ===
    // Stores first and last names, trims extra spaces
    name: {
      first: { type: String, trim: true },
      last: { type: String, trim: true }
    },

    // === User Email ===
    // Required, unique, and stored in lowercase
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },

    // === Zip Code ===
    // Validates zip code (min and max)
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short"], // Minimum 4-digit zip code
      max: 99999
    },

    // === Password ===
    // Required; will be hashed before saving
    password: {
      type: String,
      required: true
    },

    // === Courses Enrolled ===
    // Array of references to Course documents
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],

    // === Linked Subscriber Account ===
    // Reference to a Subscriber document associated with this user
    subscribedAccount: {
      type: Schema.Types.ObjectId,
      ref: "Subscriber"
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// === Virtual Property: fullName ===
// Combines first and last name into a single property
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

// === Pre-save Hook: Link Subscriber Account ===
// Before saving a user, link to the corresponding Subscriber account by email
userSchema.pre("save", function(next) {
  let user = this;

  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({ email: user.email })
      .then(subscriber => {
        user.subscribedAccount = subscriber; // Link subscriber if found
        next();
      })
      .catch(error => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error); // Pass error to Mongoose
      });
  } else {
    next(); // Already linked, continue saving
  }
});

// === Pre-save Hook: Hash Password ===
// Hash the user's password before saving to the database
userSchema.pre("save", function(next) {
  let user = this;

  bcrypt.hash(user.password, 10) // Salt rounds = 10
    .then(hash => {
      user.password = hash; // Replace plain password with hashed version
      next();
    })
    .catch(error => {
      console.log(`Error in hashing password: ${error.message}`);
      next(error);
    });
});

// === Instance Method: passwordComparison ===
// Compares a plain-text password with the hashed password stored in DB
userSchema.methods.passwordComparison = function(inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password); // Returns a promise
};

// === Export User Model ===
// Allows the schema to be used in controllers and other parts of the app
module.exports = mongoose.model("User", userSchema);
