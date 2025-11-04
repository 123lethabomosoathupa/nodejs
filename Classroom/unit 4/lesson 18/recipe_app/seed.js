"use strict"; // Enforce strict mode for safer JavaScript

// Import Mongoose library and Subscriber model
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// Connect to MongoDB using Mongoose
mongoose.connect(
  "mongodb://0.0.0.0:27017/recipe_db", // MongoDB connection string
  { useNewUrlParser: true } // Option to parse MongoDB connection string correctly
);

// Access the default connection (not strictly needed here, just reference)
mongoose.connection;

// Sample subscriber data to seed into the database
let contacts = [
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016
  },
  {
    name: "Chef Eggplant",
    email: "eggplant@recipeapp.com",
    zipCode: 20331
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com",
    zipCode: 19103
  }
];

// Delete all existing subscribers before seeding new data
Subscriber.deleteMany()
  .exec() // Execute the query and return a Promise
  .then(() => {
    console.log("Subscriber data is empty!"); // Log confirmation
  });

// Array to hold Promises for creating new subscribers
let commands = [];

// Loop through each contact and create a Mongoose create command
contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name, // Set subscriber name
      email: c.email // Set subscriber email
      // zipCode is optional here; could also include c.zipCode if schema allows
    })
  );
});

// Execute all create commands concurrently
Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r)); // Log all created subscriber documents
    mongoose.connection.close(); // Close MongoDB connection when done
  })
  .catch(error => {
    console.log(`ERROR: ${error}`); // Handle and log any errors
  });
