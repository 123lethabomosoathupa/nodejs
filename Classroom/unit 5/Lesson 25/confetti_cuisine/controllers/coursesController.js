"use strict";

// === Import Course Model ===
const Course = require("../models/course");

// === Helper Function ===
const getCourseParams = (body) => ({
  title: body.title,
  description: body.description,
  maxStudents: body.maxStudents,
  cost: body.cost
});

// === Export Controller Methods ===
module.exports = {
  // === List all courses ===
  index: (req, res, next) => {
    Course.find()
      .then((courses) => {
        res.locals.courses = courses;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },

  // === Render the index view ===
  indexView: (req, res) => {
    res.render("courses/index", { courses: res.locals.courses });
  },

  // === Render form for new course ===
  new: (req, res) => {
    res.render("courses/new");
  },

  // === Create a new course ===
  create: (req, res, next) => {
    const courseParams = getCourseParams(req.body);
    Course.create(courseParams)
      .then((course) => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  // === Redirect helper ===
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  // === Find a course by ID ===
  show: (req, res, next) => {
    const courseId = req.params.id;
    Course.findById(courseId)
      .then((course) => {
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  // === Render single course view ===
  showView: (req, res) => {
    res.render("courses/show", { course: res.locals.course });
  },

  // === Render edit form for a course ===
  edit: (req, res, next) => {
    const courseId = req.params.id;
    Course.findById(courseId)
      .then((course) => {
        res.render("courses/edit", { course });
      })
      .catch((error) => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  // === Update course ===
  update: (req, res, next) => {
    const courseId = req.params.id;
    const courseParams = getCourseParams(req.body);

    Course.findByIdAndUpdate(courseId, { $set: courseParams })
      .then((course) => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error updating course: ${error.message}`);
        next(error);
      });
  },

  // === Delete course ===
  delete: (req, res, next) => {
    const courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting course: ${error.message}`);
        next(error);
      });
  }
};
