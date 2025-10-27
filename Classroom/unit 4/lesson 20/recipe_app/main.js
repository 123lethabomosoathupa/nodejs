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

const methodOverride = require("method-override");
// === Connect to MongoDB ===
mongoose.connect("mongodb://localhost:27017/recipe_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

// === Optional: confirm connection ===
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// === Express App Setup ===
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// === Middleware & Controllers ===
app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.use(homeController.logRequestPaths);

// === Routes ===
app.get("/", homeController.index);
app.get("/contact", homeController.getSubscriptionPage);

app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.delete("/users/:id", usersController.delete, usersController.redirectView);


app.get("/subscribers", subscribersController.index, subscribersController.indexView);
app.get("/courses", coursesController.index, coursesController.indexView);
app.post("/subscribe", subscribersController.saveSubscriber);

// === Error Handlers ===
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// === Start Server ===
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
