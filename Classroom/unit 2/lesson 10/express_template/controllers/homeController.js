"use strict";

exports.respondHome = (req, res) => {
  res.render("index", { title: "Home Page" });
};

exports.respondWithName = (req, res) => {
  let userName = req.params.myName;
  res.render("name", { title: "Personal Greeting", name: userName });
};
