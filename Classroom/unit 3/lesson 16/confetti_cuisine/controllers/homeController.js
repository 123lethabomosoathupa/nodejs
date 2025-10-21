"use strict";

// Courses array
var courses = [
  { title: "Event Driven Cakes", cost: 50 },
  { title: "Asynchronous Artichoke", cost: 25 },
  { title: "Object Oriented Orange Juice", cost: 10 }
];

// === ROUTE HANDLER FUNCTIONS ===

// GET /items/:vegetable
exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

// POST /
exports.sendPost = (req, res) => {
  console.log(req.body);
  res.send("POST Successful!");
};

// GET /name/:myName
exports.respondWithName = (req, res) => {
  let name = req.params.myName;
  res.send(`Hello, ${name}!`);
};

// GET /courses
exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};

// GET /contact
exports.showSignUp = (req, res) => {
  res.render("contact");
};

// POST /contact
exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};
