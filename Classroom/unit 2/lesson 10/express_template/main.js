const express = require("express");
const path = require("path");
const app = express();
const port = 3000;


// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));


// Routes
app.get("/", (req, res) => {
res.render("index", { firstName: "Lethabo" });
});


app.get("/courses", (req, res) => res.render("courses"));
app.get("/contact", (req, res) => res.render("contact"));


app.post("/contact", (req, res) => {
const userEmail = req.body.email;
console.log(`Form submitted by: ${userEmail}`);
res.render("thanks", { email: userEmail });
});


app.use((req, res) => res.status(404).render("error"));


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));