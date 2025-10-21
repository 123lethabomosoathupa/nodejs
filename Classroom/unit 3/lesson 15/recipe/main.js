"use strict";
const express = require("express"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    app = express(),
    port = 3000,
    homeController = require("./controllers/homeController"),
    subscribersController = require("./controllers/subscribersController"),
    errorController = require("./controllers/errorController");
// === Database Connection ===
mongoose.connect("mongodb://127.0.0.1:27017/confetti_cuisine", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.once("open", () => {
    console.log("■ Connected to MongoDB successfully!");
});
// === View Engine Setup ===
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));
// === Middleware ===
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// === ROUTES ===
app.get("/", homeController.showHome);
app.get("/courses", homeController.showCourses);
// Contact and subscription routes
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
// Display all subscribers
app.get("/subscribers", subscribersController.getAllSubscribers);
// === ERROR HANDLING ===
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
// === Start Server ===
app.listen(port, () => {
    console.log(`■ Confetti Cuisine running on port ${port}`);
});