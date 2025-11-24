// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plugin for handling unique field validation
var uniqueValidator = require('mongoose-unique-validator');

// Import bcrypt for password hashing
const bcrypt = require('bcrypt');

// Define the User schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true, // Username is required
    unique: true    // Must be unique in the database
  },
  password: {
    type: String,
    required: true  // Password is required
  }
});

// Apply the uniqueValidator plugin to provide better error messages for unique fields
UserSchema.plugin(uniqueValidator);

// Pre-save hook to hash the password before saving the user
UserSchema.pre('save', function(next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Hash the password with a salt factor of 10
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) return next(error); // Pass any errors to next middleware
    user.password = hash;          // Replace plain text password with hashed version
    next();                        // Continue saving the user
  });
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

// Export the model to use it in controllers
module.exports = User;
