"use strict";

const Course = require("../models/course");

module.exports = {
  // Home page
  index: (req, res) => {
    res.render("index");
  },

  // Contact page
  contact: (req, res) => {
    res.render("contact");
  },

  // List courses on courses.ejs
  showCourses: (req, res, next) => {
    Course.find()
      .then(courses => {
        res.render("courses/index", { courses });
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  }
};
