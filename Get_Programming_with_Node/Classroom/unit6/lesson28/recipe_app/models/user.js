"use strict"; 
// Enforce strict mode for safer JavaScript coding

const mongoose = require("mongoose"),
  { Schema } = mongoose, 
  // Destructure Schema from mongoose
  Subscriber = require("./subscriber"), 
  // Import Subscriber model for linking accounts
  passportLocalMongoose = require("passport-local-mongoose"), 
  // Plugin to handle password hashing and authentication
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String, 
          trim: true // Remove whitespace from beginning and end
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,  // Email required
        lowercase: true, // Convert to lowercase before saving
        unique: true     // Must be unique
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"], // Minimum value with custom message
        max: 99999                        // Maximum value
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }], 
      // Array of references to Course documents (many-to-many)
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber" 
        // Reference to Subscriber model (one-to-one link)
      }
    },
    {
      timestamps: true 
      // Automatically add createdAt and updatedAt timestamps
    }
  );

// Virtual field for full name
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`; // Concatenate first and last names
});

// Pre-save middleware to link Subscriber account
userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({ email: user.email }) // Find subscriber by email
      .then(subscriber => {
        user.subscribedAccount = subscriber; // Link subscriber account
        next(); // Continue saving
      })
      .catch(error => {
        console.log(`Error in connecting subscriber:${error.message}`); // Log error
        next(error); // Pass error to Mongoose
      });
  } else {
    next(); // Already linked, continue saving
  }
});

// Passport.js plugin handles password hashing and adds salt & hash fields
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email" // Use email as the login username
});

// Pre-save middleware to generate API token if missing
userSchema.pre("save", function (next) {
  let user = this;
  if (!user.apiToken) user.apiToken = randToken.generate(16); 
  // Generate a 16-character random token
  next();
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
