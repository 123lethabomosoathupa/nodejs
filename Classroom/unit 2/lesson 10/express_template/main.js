"use strict";

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const port = 3000;

const homeController = require("./controllers/homeController");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});
app.get("/", homeController.respondHome);
app.get("/name/:myName", homeController.respondWithName);

// Error handling route
app.use((req, res) => res.status(404).render("error", { title: "404 Error" }));

// Server
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
