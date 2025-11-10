"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  Subscriber = require("./models/subscriber");

// ===========================================================
// ✅ DATABASE CONNECTION (Modern Mongoose v8 syntax)
// ===========================================================
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/recipe_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const db = mongoose.connection;
db.once("open", () => console.log("📦 Database connection established successfully!"));

// ===========================================================
// ✅ EXPRESS APP CONFIGURATION
// ===========================================================
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));          // Serve files from /public (CSS, images, etc.)
app.use(layouts);                           // Use express-ejs-layouts
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ===========================================================
// ✅ MIDDLEWARE
// ===========================================================
app.use(homeController.logRequestPaths);

// ===========================================================
// ✅ ROUTES
// ===========================================================

// --- Home Pages ---
app.get("/", homeController.index);
app.get("/contact", homeController.getSubscriptionPage);

// --- Users ---
app.get("/users", usersController.index, usersController.indexView);

// --- Subscribers ---
app.get("/subscribers", subscribersController.index, subscribersController.indexView);
app.get("/subscribers/new", subscribersController.new);
app.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
app.get("/subscribers/:id", subscribersController.show, subscribersController.showView);

// --- Courses ---
app.get("/courses", coursesController.index, coursesController.indexView);

// --- Subscription form (from contact page) ---
app.post("/subscribe", subscribersController.saveSubscriber);

// ===========================================================
// ✅ ERROR HANDLERS
// ===========================================================
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// ===========================================================
// ✅ START SERVER
// ===========================================================
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
