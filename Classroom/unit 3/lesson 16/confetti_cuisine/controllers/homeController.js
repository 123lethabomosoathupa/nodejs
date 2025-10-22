"use strict"; // Enforces strict mode for safer, cleaner JavaScript

// === Sample Courses Data ===
// This is a temporary in-memory array representing courses offered by Confetti Cuisine.
let courses = [
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
    offeredCourses: courses // Pass the array to the template
  });
};

// === Controller: Show Homepage ===
// Renders the main "index.ejs" homepage.
exports.index = (req, res) => {
  res.render("index");
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

// === Commented Out / Unused Controllers ===
// These were example controllers for logging requests or handling route parameters.

// // Log request paths (for debugging purposes)
// exports.logRequestPaths = (req, res, next) => {
//   console.log(`request made to: ${req.url}`);
//   next();
// };

// // Respond based on a route parameter (e.g., /vegetable/:vegetable)
// exports.sendReqParam = (req, res) => {
//   let veg = req.params.vegetable;
//   res.send(`This is the page for ${veg}`);
// };

// // Another example: simply render the index page
// exports.respondWithName = (req, res) => {
//   res.render("index");
// };
