"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Sample Courses Data ===
// Temporary in-memory array representing courses offered by Confetti Cuisine.
var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
  }
];

// === Controller: Show Courses Page ===
// Renders the "courses.ejs" view and passes the list of offered courses.
exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses // Passed to the EJS template for dynamic rendering
  });
};

// === Controller: Show Contact / Sign-Up Page ===
// Renders the "contact.ejs" page containing the subscription form.
exports.showSignUp = (req, res) => {
  res.render("contact");
};

// === Controller: Handle Form Submission ===
// Handles POST requests from the contact form.
// Renders a "thanks.ejs" page after the form is submitted.
exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};
