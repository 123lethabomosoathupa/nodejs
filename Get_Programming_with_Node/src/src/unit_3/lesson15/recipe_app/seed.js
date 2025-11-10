"use strict";

const mongoose = require("mongoose"); // Mongoose ODM for MongoDB
const Subscriber = require("./models/subscriber"); // Subscriber model

// ========================
// Database Connection
// ========================
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true, // Use new URL parser
});
mongoose.connection; // Access the connection (not strictly needed here)

// ========================
// Sample Data to Seed
// ========================
let contacts = [
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016,
  },
  {
    name: "Chef Eggplant",
    email: "eggplant@recipeapp.com",
    zipCode: 20331,
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com",
    zipCode: 19103,
  },
];

// ========================
// Clear Existing Data
// ========================
Subscriber.deleteMany()
  .exec() // Returns a promise
  .then(() => {
    console.log("Subscriber data is empty!"); // Confirm all previous records deleted
  });

// ========================
// Insert New Data
// ========================
let commands = [];

// Loop through contacts array and create a Subscriber for each contact
contacts.forEach((c) => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email,
      zipCode: c.zipCode, // Include zipCode in creation
    })
  );
});

// Execute all create operations as promises
Promise.all(commands)
  .then((r) => {
    console.log("Inserted subscribers:", JSON.stringify(r, null, 2)); // Log inserted records
    mongoose.connection.close(); // Close the database connection
  })
  .catch((error) => {
    console.log(`ERROR: ${error}`); // Handle any errors during creation
  });

/*
  SUMMARY:
  1. Connects to MongoDB using Mongoose.
  2. Defines a sample array of subscriber contacts.
  3. Deletes all existing Subscriber documents to start fresh.
  4. Loops through the sample data and creates new Subscriber documents.
  5. Executes all create operations using Promise.all for concurrency.
  6. Logs inserted documents and closes the database connection.
  7. Provides basic error handling for both deletion and creation.
  
  Purpose:
  This script is used to seed the 'subscribers' collection with sample data for testing or development.
*/
