"use strict"; // ✅ Enforce strict mode for safer, cleaner JavaScript

// ---------------- Module Imports ----------------
const express = require("express"), // Web framework for Node.js
  app = express(), // Initialize Express app
  router = require("./routes/index"), // Import main router
  layouts = require("express-ejs-layouts"), // Enables layout support for EJS templates
  mongoose = require("mongoose"), // MongoDB object modeling tool
  methodOverride = require("method-override"), // Allows overriding HTTP methods (e.g. PUT, DELETE via forms)
  expressSession = require("express-session"), // Session middleware for managing user sessions
  cookieParser = require("cookie-parser"), // Parses cookies attached to client requests
  connectFlash = require("connect-flash"), // Middleware for temporary messages between requests
  passport = require("passport"), // Authentication middleware
  errorController = require("./controllers/errorController"), // Handles app-wide errors
  homeController = require("./controllers/homeController"), // Controller for homepage routes
  subscribersController = require("./controllers/subscribersController"), // Controller for subscriber-related routes
  usersController = require("./controllers/usersController"), // Controller for user-related routes
  coursesController = require("./controllers/coursesController"), // Controller for course-related routes
  User = require("./models/user"); // User model for authentication and user data

// ✅ Modern import for express-validator (used for request validation)
const { body, validationResult } = require("express-validator");

// ---------------- Mongoose Connection ----------------
mongoose.Promise = global.Promise; // Use native JavaScript promises for Mongoose

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true, // Use the new MongoDB connection string parser
  useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
});

const db = mongoose.connection;

// ✅ Confirm MongoDB connection success
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

// ---------------- Express Configuration ----------------
app.set("port", process.env.PORT || 3000); // Define default port
app.set("view engine", "ejs"); // Set EJS as the templating engine

// Serve static files (CSS, JS, images) from the "public" directory
app.use(express.static("public"));

// Enable layout support for EJS views
app.use(layouts);

// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable support for PUT and DELETE methods using `_method` query parameter
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

// ---------------- Session & Cookie Configuration ----------------
app.use(cookieParser("secret_passcode")); // Parse cookies with a secret key
app.use(
  expressSession({
    secret: "secret_passcode", // Session encryption key
    cookie: { maxAge: 4000000 }, // Cookie lifespan (in ms)
    resave: false, // Avoid resaving session if not modified
    saveUninitialized: false // Don’t save uninitialized sessions
  })
);

// ---------------- Passport Authentication ----------------
app.use(passport.initialize()); // Initialize Passport middleware
app.use(passport.session()); // Enable session-based authentication

// Use Passport’s local strategy provided by passport-local-mongoose
passport.use(User.createStrategy());

// Serialize and deserialize user data for session management
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------- Flash Messages ----------------
app.use(connectFlash()); // Enable flash messages for temporary alerts

// ---------------- Global Middleware ----------------
// Makes common data available to all EJS templates
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated(); // Check if user is logged in
  res.locals.currentUser = req.user; // Make current user available globally
  res.locals.flashMessages = req.flash(); // Include flash messages in all views
  next();
});



// ---------------- Route Handling ----------------
app.use("/", router); // Mount main router to handle routes

// ---------------- Server Startup ----------------
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});

/**
 * ===============================================================
 * 🚀 Node.js Application — Main Server Setup (Recipe App)
 * ===============================================================
 * 
 * This file initializes the Express server, connects to MongoDB, 
 * and integrates core middleware, authentication, validation, and routing.
 * 
 * ---------------------------------------------------------------
 * 🧩 TECHNOLOGIES & TOOLS
 * ---------------------------------------------------------------
 * - **Express.js** → Web framework for building the server and handling routes.
 * - **Mongoose** → ODM for MongoDB connection and schema modeling.
 * - **EJS + express-ejs-layouts** → Template engine for rendering dynamic views.
 * - **Passport.js** → Authentication middleware for login and session persistence.
 * - **express-session + cookie-parser + connect-flash** → Manage sessions, cookies, and flash messages.
 * - **method-override** → Enables PUT and DELETE HTTP methods from forms.
 * - **express-validator** → Input validation middleware for routes and controllers.
 * 
 * ---------------------------------------------------------------
 * ⚙️ MAIN CONFIGURATION
 * ---------------------------------------------------------------
 * - Connects to MongoDB database: `recipe_db`.
 * - Sets EJS as the view engine and serves static assets from `/public`.
 * - Uses `methodOverride` to simulate PUT/DELETE in forms.
 * - Parses incoming request data (JSON and URL-encoded).
 * - Configures secure cookie-based sessions.
 * - Initializes Passport.js for user authentication.
 * 
 * ---------------------------------------------------------------
 * 🧭 ROUTING
 * ---------------------------------------------------------------
 * - Routes are modularized in `/routes/index.js`.
 * - Controller structure follows MVC pattern:
 *    - `homeController` → Homepage & static routes.
 *    - `usersController` → User CRUD + login/logout.
 *    - `subscribersController` → Newsletter subscription management.
 *    - `coursesController` → Course CRUD functionality.
 * - `express-validator` is now imported and used **directly** in routes or controllers 
 *   for cleaner, modern validation (replaces deprecated `expressValidator()` middleware).
 * 
 * ---------------------------------------------------------------
 * 🚨 ERROR HANDLING
 * ---------------------------------------------------------------
 * - Centralized error handling through `errorController` for:
 *   - 404 “Not Found” routes.
 *   - 500 “Internal Server Error” responses.
 * 
 * ---------------------------------------------------------------
 * 🧠 ARCHITECTURE & NOTES
 * ---------------------------------------------------------------
 * - Follows **MVC (Model-View-Controller)** structure:
 *    - Models → Mongoose schemas (User, Course, Subscriber)
 *    - Views → EJS templates
 *    - Controllers → Handle route logic and database interactions
 * - Uses environment-based port configuration (default: 3000).
 * 
 * ---------------------------------------------------------------
 * ✅ LAUNCH INFO
 * ---------------------------------------------------------------
 * - Server: Express (Port 3000 by default)
 * - Database: MongoDB (local instance)
 * - Authentication: Passport.js (local strategy via User model)
 * - Validation: express-validator (modern syntax)
 */
