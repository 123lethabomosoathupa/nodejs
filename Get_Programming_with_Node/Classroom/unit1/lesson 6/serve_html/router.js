// Import the HTTP status codes module for cleaner and more readable responses
const httpStatus = require("http-status-codes"),

// Define a default content type for HTML responses
    htmlContentType = {
        "Content-Type": "text/html"
    },

// Define route handlers for different HTTP methods (GET and POST)
    routes = {
        "GET": {
            // Example route for a GET request to "/info"
            "/info": (req, res) => {
                // Set response header with status 200 OK and plain text content type
                res.writeHead(httpStatus.OK, {
                    "Content-Type": "text/plain"
                });
                // Send a simple text response to the client
                res.end("Welcome to the Info Page!");
            }
        },
        // Object to hold POST routes (empty for now)
        "POST": {}
    };

// Exported function that handles incoming HTTP requests
exports.handle = (req, res) => {
    try {
        // Check if the requested route and method exist in the routes object
        if (routes[req.method][req.url]) {
            // Execute the corresponding route handler
            routes[req.method][req.url](req, res);
        } else {
            // If no matching route is found, respond with 404 Not Found
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            res.end("<h1>No such file exists</h1>");
        }
    } catch (ex) {
        // Log any unexpected errors that occur while handling requests
        console.log("error: " + ex);
    }
};

// Function to register a new GET route dynamically
exports.get = (url, action) => {
    routes["GET"][url] = action;
};

// Function to register a new POST route dynamically
exports.post = (url, action) => {
    routes["POST"][url] = action;
};
