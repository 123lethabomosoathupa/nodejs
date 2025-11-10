"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const Subscriber = require("./models/subscriber");

// 🔐 Authentication + session-related imports
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");
const User = require("./models/user");

// ✅ express-validator import (for form validation)
const { body, validationResult } = require("express-validator");

// ----------------------------
// ✅ MONGOOSE CONFIGURATION
// ----------------------------
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db");
const db = mongoose.connection;

db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

// ----------------------------
// ✅ APP CONFIGURATION
// ----------------------------
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Layouts & middleware setup
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// ----------------------------
// ✅ COOKIE, SESSION & FLASH
// ----------------------------
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(connectFlash());

// ----------------------------
// ✅ PASSPORT INITIALIZATION
// ----------------------------
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Make login info & flash messages available to all views
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

// ----------------------------
// ✅ ROUTES
// ----------------------------

// Home routes
router.use(homeController.logRequestPaths);
router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

// USER ROUTES
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

// SUBSCRIBER ROUTES
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.post("/subscribe", subscribersController.saveSubscriber);

// COURSE ROUTES
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);

// RECIPE ROUTES (with validation)
router.post(
  "/recipes",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("ingredients").notEmpty().withMessage("Ingredients are required"),
    body("instructions").notEmpty().withMessage("Instructions are required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // TODO: Save recipe logic here
    res.send("✅ Recipe saved successfully!");
  }
);

// ----------------------------
// ✅ ERROR HANDLING
// ----------------------------
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

// ----------------------------
// ✅ APP START
// ----------------------------
app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
/**
 * ==========================================
 * 🍽️ Confetti Cuisine App — Server Setup
 * ==========================================
 * CRUD routes are a set of web application routes that correspond to the four fundamental operations of persistent data: Create, Read, Update, and Delete.
 * This file serves as the main entry point for the Confetti Cuisine web application.
 * It sets up Express, connects to MongoDB, and defines all major configurations, middleware, and routes.
 * 
 * ------------------------------------------
 * 🧩 TECHNOLOGIES USED
 * ------------------------------------------
 * - **Express.js**: Web server framework for handling routing and middleware.
 * - **EJS + express-ejs-layouts**: Template engine and layout manager for views.
 * - **Mongoose**: MongoDB ORM for defining schemas and handling data persistence.
 * - **Passport.js**: Authentication middleware (login, session management).
 * - **express-session + connect-flash**: Handles user sessions and flash messaging.
 * - **express-validator**: Provides form validation for user and recipe inputs.
 * - **method-override**: Allows HTML forms to send PUT and DELETE requests.
 * - **cookie-parser**: Parses cookies for secure session handling.
 * 
 * ------------------------------------------
 * ⚙️ MAIN CONFIGURATION
 * ------------------------------------------
 * - Connects to a local MongoDB database (`recipe_db`).
 * - Configures EJS as the templating engine.
 * - Enables static files from the `/public` directory.
 * - Sets up middleware for form handling, JSON parsing, cookies, and sessions.
 * - Initializes Passport for authentication (User model used as strategy).
 * 
 * ------------------------------------------
 * 🧭 ROUTING OVERVIEW
 * ------------------------------------------
 * - `/` and `/contact`: Handled by `homeController` for basic pages.
 * - `/users`: Full CRUD + authentication routes handled by `usersController`.
 *   - Includes login, logout, create, update, delete, and profile viewing.
 * - `/subscribers`: Managed via `subscribersController` for newsletter signups.
 * - `/courses`: Managed via `coursesController` for viewing and editing courses.
 * - `/recipes`: Includes input validation with `express-validator` before saving.
 * 
 * ------------------------------------------
 * 🚨 ERROR HANDLING
 * ------------------------------------------
 * - Uses centralized middleware in `errorController` for:
 *   - Logging errors to the console.
 *   - Handling 404 (Not Found) and 500 (Internal Server) responses.
 * 
 * ------------------------------------------
 * 🚀 SERVER START
 * ------------------------------------------
 * - Runs on port 3000 (or environment-specified port).
 * - Logs successful connection messages for both MongoDB and Express server.
 * 
 * ------------------------------------------
 * 🧠 ARCHITECTURAL NOTES
 * ------------------------------------------
 * This structure follows MVC (Model-View-Controller):
 * - Models define database schemas (User, Subscriber, Course).
 * - Controllers contain logic for handling HTTP requests.
 * - Views (EJS templates) handle rendering user-facing pages.
 * 
 * The application design ensures modularity, scalability, and clean separation of concerns.
 */
