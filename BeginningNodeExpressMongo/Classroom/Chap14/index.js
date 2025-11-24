// Load core modules and packages
const express = require("express");
const app = new express();
const path = require("path");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectFlash = require("connect-flash"); // Flash messages for login errors, validation, etc.

// Controllers (each controller handles a specific route's logic)
const storeUserController = require("./controllers/storeUser");
const newUserController = require("./controllers/newUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/userLogin");
const logoutController = require("./controllers/logout");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')

// Middleware (custom logic executed before route handlers)
const authMiddleware = require("./middleware/authMiddleware"); // Protects routes (only logged-in users can access)
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware"); // Prevent logged-in users from accessing login/register pages

// Example custom middleware to test request flow
const customMiddleWare = (req, res, next) => {
  console.log("Custom middleware called");
  next();
};

// Middleware to validate post submission
const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect("/posts/new"); // Redirect if file or title is missing
  }
  next();
};

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// View Engine (EJS templates)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views")); // Template folder

// Global Middleware
app.use(express.static("public")); // Serve static files (CSS, images, JS)
app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(fileUpload()); // Allow file uploads
app.use(customMiddleWare); // Test middleware

// Session setup
app.use(
  expressSession({
    secret: "keyboard cat", // Session encryption key
  })
);

// Flash messages must come after session middleware
app.use(connectFlash());

// Make the session user ID accessible everywhere (for navbar login state)
global.loggedIn = null;
app.use((req, res, next) => {
  loggedIn = req.session.userId; // Save current user's ID globally
  next();
});

// -------------------- ROUTES -------------------- //

// Home page
app.get("/", homeController);

// Single post view
app.get("/post/:id", getPostController);

// Static pages
app.get('/about', aboutController);
app.get('/contact', contactController);

// Authentication routes
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post("/users/login", redirectIfAuthenticatedMiddleware, loginUserController);

app.get("/auth/logout", logoutController);

// Post creation routes (protected: must be logged in)
app.get("/posts/new", authMiddleware, newPostController);
app.post("/posts/store", authMiddleware, validateMiddleWare, storePostController);

// 404 fallback page
app.use((req, res) => res.render("notfound"));

// Start the server
app.listen(4000, () => {
  console.log("App listening on port 4000");
});
 