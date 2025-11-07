"use strict";

const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  coursesController = require("../controllers/coursesController");

router.post("/login", usersController.apiAuthenticate);

router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.use(coursesController.errorJSON);

module.exports = router;