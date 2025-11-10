"use strict"; 
// Enforces strict mode — catches common JavaScript errors like undeclared variables.

const mongoose = require("mongoose"),
  { Schema } = mongoose, 
  // Destructure Schema from mongoose for convenience
  Subscriber = require("./subscriber"), 
  // Import Subscriber model to link accounts
  bcrypt = require("bcrypt"), 
  // Import bcrypt for password hashing (used by Passport internally)
  passportLocalMongoose = require("passport-local-mongoose"), 
  // Plugin to simplify username/password authentication
  userSchema = new Schema(
    {
      // --------------------------
      // 👤 Name field (first + last)
      // --------------------------
      name: {
        first: {
          type: String,  // First name
          trim: true     // Remove extra spaces
        },
        last: {
          type: String,  // Last name
          trim: true     // Remove extra spaces
        }
      },

      // --------------------------
      // 📧 Email field
      // --------------------------
      email: {
        type: String,      // Must be a string
        required: true,    // Mandatory field
        lowercase: true,   // Convert to lowercase before saving
        unique: true       // No two users can have same email
      },

      // --------------------------
      // 📍 Zip code field
      // --------------------------
      zipCode: {
        type: Number,                          // Numeric field
        min: [1000, "Zip code too short"],     // Minimum value validation
        max: 99999                             // Maximum value validation
      },

      // --------------------------
      // 📚 Courses field (references Course model)
      // --------------------------
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }], 

      // --------------------------
      // 📝 Linked Subscriber account
      // --------------------------
      subscribedAccount: {
        type: Schema.Types.ObjectId, // Stores ObjectId of subscriber
        ref: "Subscriber"            // References Subscriber model
      }
    },
    {
      timestamps: true // Automatically adds createdAt and updatedAt fields
    }
  );

// ------------------------------------------------------
// 🔗 Virtual property: fullName
// ------------------------------------------------------
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`; 
  // Returns concatenated first + last name as a virtual property
});

// ------------------------------------------------------
// ⚙️ Pre-save middleware: link Subscriber account
// ------------------------------------------------------
userSchema.pre("save", function(next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    // If no linked subscriber exists, try to find one by email
    Subscriber.findOne({ email: user.email })
      .then(subscriber => {
        user.subscribedAccount = subscriber; // Link subscriber account
        next(); // Continue save
      })
      .catch(error => {
        console.log(`Error in connecting subscriber:${error.message}`);
        next(error); // Pass error to next middleware
      });
  } else {
    next(); // Already linked, continue save
  }
});

// ------------------------------------------------------
// 🔑 Passport.js plugin: add authentication methods
// ------------------------------------------------------
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email" 
  // Use email as the username field instead of default 'username'
});

// ------------------------------------------------------
// 🧩 EXPORT MODEL
// ------------------------------------------------------
module.exports = mongoose.model("User", userSchema); 
// Exports User model to be used in controllers or elsewhere
