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

const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
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

router.use(express.static("public"));
router.use(layouts);
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// ----------------------------
// ✅ COOKIE, SESSION & FLASH
// ----------------------------
router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// ----------------------------
// ✅ HOME ROUTES
// ----------------------------
router.use(homeController.logRequestPaths);
router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

// ----------------------------
// ✅ USER ROUTES
// ----------------------------
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);

// Login routes BEFORE dynamic :id routes
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);

router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

// ----------------------------
// ✅ SUBSCRIBER ROUTES
// ----------------------------
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.post("/subscribe", subscribersController.saveSubscriber);

// ----------------------------
// ✅ COURSE ROUTES
// ----------------------------
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);

// ----------------------------
// ✅ RECIPE ROUTES (with modern express-validator)
// ----------------------------
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
      // You can render a template or return JSON
      return res.status(400).json({ errors: errors.array() });
    }

    // Continue with saving recipe logic here
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
