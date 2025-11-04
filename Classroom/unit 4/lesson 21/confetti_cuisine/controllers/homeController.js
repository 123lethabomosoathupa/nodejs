"use strict"; // Enforce strict mode for safer JavaScript

// Sample array of courses (simulated database)
let courses = [
  {
    title: "Event Driven Cakes", // Course title
    cost: 50 // Course cost in dollars
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

// --- Render a page showing all courses ---
exports.showCourses = (req, res) => {
  res.render("courses", {       // Render the 'courses' EJS template
    offeredCourses: courses     // Pass the courses array to the view
  });
};

// --- Render home page ---
exports.index = (req, res) => {
  res.render("index"); // Render the 'index' EJS template
};

// --- Middleware to log request paths (commented out) ---
// exports.logRequestPaths = (req, res, next) => {
//   console.log(`request made to: ${req.url}`);
//   next();
// };

// --- Example route to handle dynamic route params (commented out) ---
// exports.sendReqParam = (req, res) => {
//   let veg = req.params.vegetable; // Get 'vegetable' param from URL
//   res.send(`This is the page for ${veg}`); // Send response with param
// };

// --- Example route to render page with name (commented out) ---
// exports.respondWithName = (req, res) => {
//   res.render("index");
// };

// --- Render sign-up/contact page ---
exports.showSignUp = (req, res) => {
  res.render("contact"); // Render the 'contact' EJS template
};

// --- Handle posted sign-up form ---
exports.postedSignUpForm = (req, res) => {
  res.render("thanks"); // Render the 'thanks' EJS template after form submission
};
