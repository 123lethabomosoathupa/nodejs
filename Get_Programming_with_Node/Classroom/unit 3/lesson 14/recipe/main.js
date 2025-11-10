"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// -------------------------------
// DATABASE CONNECTION
// -------------------------------
mongoose.connect("mongodb://127.0.0.1:27017/recipe_db")
  .then(() => console.log("✅ Successfully connected to MongoDB using Mongoose!"))
  .catch(error => console.error("❌ MongoDB connection error:", error));

// -------------------------------
// CREATE & QUERY DOCUMENTS
// -------------------------------
Subscriber.create({
  name: "Lethabo Mosoathupa",
  email: "lethabo.mosoathupa8@gmail.com"
})
  .then(savedDoc => {
    console.log("✅ Document saved:", savedDoc);
    return Subscriber.find({ name: "Lethabo Mosoathupa" });
  })
  .then(docs => {
    console.log("📄 Query results:", docs);
  })
  .catch(err => {
    console.error("⚠️ Error:", err);
  });

// -------------------------------
// EXPRESS APP CONFIGURATION
// -------------------------------
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(homeController.logRequestPaths);

// -------------------------------
// ROUTES
// -------------------------------
app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

// -------------------------------
// ERROR HANDLING
// -------------------------------
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// -------------------------------
// START SERVER
// -------------------------------
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
