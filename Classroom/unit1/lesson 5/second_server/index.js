"use strict"; // Enforces strict mode to catch common coding mistakes


// Define the port where the server will listen
const port = 3000;

// Import required modules
const http = require("http"); // Built-in Node.js HTTP module
const httpStatus = require("http-status-codes"); // Provides named HTTP status codes



// Create a new HTTP server instance
const app = http.createServer();

// Set up an event listener for incoming HTTP requests
app.on("request", (req, res) => {
  // Set the HTTP response headers (status and content type)
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html" // Tells the browser we're sending HTML
  });

  // Define the message that will be sent back to the client
  const responseMessage = "<h1>This will show on the screen.</h1>";

  // End the response and send the message to the browser
  res.end(responseMessage);
});

// Start the server and have it listen on the defined port
app.listen(port);

// Log a confirmation message to the console
console.log(`The server has started and is listening on port number: ${port}`);
