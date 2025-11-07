"use strict";

const express = require("express");
const app = express();

//------------------------------------------------------
const router = require("./routes/index");
//------------------------------------------------------

const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const passport = require("passport");
const homeController = require("./controllers/homeController");
const User = require("./models/user");



mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.use(express.json());
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use(expressValidator());
app.use(homeController.logRequestPaths);

//------------------------------------------------------
app.use("/", router);
//------------------------------------------------------


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

/**
 * ===============================================================
 * 🍽️ Confetti Cuisine — Main Server File (server.js)
 * ===============================================================
 * 
 * This file is the main entry point for the Confetti Cuisine web application.
 * It sets up the Express server, connects to MongoDB, and configures
 * middleware, authentication, sessions, and routing.
 * 
 * ---------------------------------------------------------------
 * 🧩 TECHNOLOGIES USED
 * ---------------------------------------------------------------
 * - **Express.js** → Web framework for creating routes and middleware.
 * - **EJS + express-ejs-layouts** → Template engine and layout system for dynamic views.
 * - **Mongoose** → MongoDB ODM for schema modeling and database management.
 * - **Passport.js** → Authentication middleware for login and session handling.
 * - **express-session + cookie-parser + connect-flash** → Manages user sessions, cookies, and flash messages.
 * - **method-override** → Enables PUT and DELETE HTTP methods from HTML forms.
 * - **express-validator** → Middleware for validating user inputs (older implementation style).
 * 
 * ---------------------------------------------------------------
 * ⚙️ MAIN CONFIGURATION
 * ---------------------------------------------------------------
 * - Connects to MongoDB at `mongodb://0.0.0.0:27017/recipe_db`.
 * - Uses EJS as the templating engine and serves static assets from `/public`.
 * - Parses URL-encoded and JSON request bodies.
 * - Configures session handling with secure cookie settings.
 * - Sets up Passport.js for local authentication (via User model).
 * 
 * ---------------------------------------------------------------
 * 🧭 ROUTING & CONTROLLERS
 * ---------------------------------------------------------------
 * - Routes are imported from `./routes/index.js` and mounted at the root (`/`).
 * - `homeController.logRequestPaths` logs incoming request URLs.
 * - Controllers handle modular logic for different parts of the app:
 *    - `homeController` → Static pages & home route logic.
 *    - `usersController` → User CRUD and authentication.
 *    - `subscribersController` → Newsletter management.
 *    - `coursesController` → Course CRUD and viewing.
 * 
 * ---------------------------------------------------------------
 * 🚨 ERROR HANDLING
 * ---------------------------------------------------------------
 * - Errors and route issues are handled in `errorController.js` (not shown here).
 * - Flash messages provide user feedback on success/failure events.
 * 
 * ---------------------------------------------------------------
 * 🧠 NOTES
 * ---------------------------------------------------------------
 * - `expressValidator()` is used here for backward compatibility, but in modern Express,
 *   you should use the destructured import from `express-validator` instead:
 *   ```js
 *   const { body, validationResult } = require("express-validator");
 *   ```
 *   and apply validations directly in routes or controllers.
 * 
 * ---------------------------------------------------------------
 * 🚀 SERVER START
 * ---------------------------------------------------------------
 * - The server listens on port **3000** (or an environment-specified port).
 * - Logs successful connection messages for MongoDB and the Express server.
 */
