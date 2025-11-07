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

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false,
  })
);

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

router.use(express.json());

router.use(cookieParser("secret_passcode"));

router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});



//HOME
router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

//USERS
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);

//SUBSCRIBERS
router.get(
  "/subscribers",
  subscribersController.index,
  subscribersController.indexView
);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);
router.get(
  "/subscribers/:id",
  subscribersController.show,
  subscribersController.showView
);
router.post("/subscribe", subscribersController.saveSubscriber);

//COURSES
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post(
  "/courses/create",
  coursesController.create,
  coursesController.redirectView
);
router.get("/courses/:id/edit", coursesController.edit);
router.put(
  "/courses/:id/update",
  coursesController.update,
  coursesController.redirectView
);
router.delete(
  "/courses/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);
router.get("/courses/:id", coursesController.show, coursesController.showView);

//ERROR HANDLING
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});


/**
 * ==========================================
 * Application Summary
 * ==========================================
 * This file is the main server setup for a Node.js web application using Express and MongoDB.
 * 
 * It configures the following:
 * 
 * 1. **Dependencies & Middleware Setup**
 *    - Express: Web framework for handling HTTP requests and routing.
 *    - EJS & express-ejs-layouts: Template engine for rendering dynamic views.
 *    - Mongoose: ODM library for MongoDB integration.
 *    - Method-Override: Allows PUT and DELETE methods from forms.
 *    - express-session, cookie-parser, and connect-flash: Manage sessions, cookies, and flash messages.
 * 
 * 2. **Database Connection**
 *    - Connects to a MongoDB database named `recipe_db`.
 *    - Logs a message when the connection is successful.
 * 
 * 3. **Express Configuration**
 *    - Sets the view engine to EJS.
 *    - Serves static files from the `public` directory.
 *    - Parses incoming requests (URL-encoded and JSON).
 *    - Sets up session and flash message handling.
 * 
 * 4. **Routing Structure**
 *    - `/` and `/contact`: Handled by `homeController`.
 *    - `/users`: Full CRUD routes for user management via `usersController`.
 *    - `/subscribers`: Full CRUD routes for subscribers via `subscribersController`.
 *    - `/courses`: Full CRUD routes for courses via `coursesController`.
 * 
 * 5. **Error Handling**
 *    - Uses centralized error middleware from `errorController` to log errors
 *      and respond with 404 (resource not found) or 500 (internal server) pages.
 * 
 * 6. **Server Initialization**
 *    - The app listens on port 3000 (or a port specified in the environment variable).
 *    - Logs a message confirming the server is running.
 * 
 * This architecture promotes separation of concerns, with controllers handling
 * the logic for each resource and middleware handling cross-cutting concerns.
 * CRUD routes are a set of web application routes that correspond to the four fundamental operations of persistent data: Create, Read, Update, and Delete.
 */
