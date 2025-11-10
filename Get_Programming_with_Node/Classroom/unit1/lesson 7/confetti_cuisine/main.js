// main.js

// Import required modules
const http = require("http");                   // Built-in HTTP module for creating the server
const httpStatus = require("http-status-codes"); // For readable HTTP status codes like 200, 404, etc.
const router = require("./router");             // Custom routing module to handle routes
const contentTypes = require("./contentTypes"); // Module defining content-type headers (HTML, CSS, JS, etc.)
const utils = require("./utils");               // Utility module for reading and sending files

// Define the port number for the server
const port = 3000;

/* ===============================
   📄 Page Routes (GET requests)
   =============================== */

// Serve index (home) page
router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);      // Set response header: status 200, content type HTML
    utils.getFile("views/index.html", res);               // Read and send index.html file
});

// Serve courses page
router.get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/courses.html", res);
});

// Serve contact page
router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/contact.html", res);
});

/* =======================================
   📨 Handle POST request from contact form
   (Simple example: shows a "thanks" page)
   ======================================= */
router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/thanks.html", res);              // Return static thank-you page (no body parsing here)
});

/* ===============================
   🎨 Static Asset Routes (CSS, JS, Images)
   =============================== */

// Serve Bootstrap CSS file
router.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap.css", res);
});

// Serve Confetti Cuisine CSS file
router.get("/confetti_cuisine.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/confetti_cuisine.css", res);
});

// Serve main JavaScript file
router.get("/confettiCuisine.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    utils.getFile("public/js/confettiCuisine.js", res);
});

// Serve product image
router.get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/product.jpg", res);
});

// Serve people image
router.get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/people.jpg", res);
});

// Serve graph image
router.get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    utils.getFile("public/images/graph.png", res);
});

/* ===============================
   🚀 Start the HTTP server
   =============================== */

// Create and start the server, using the router's request handler
http.createServer(router.handle).listen(port);

// Log message confirming the server is running
console.log(`Server listening on port ${port}`);
