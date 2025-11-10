"use strict";  
// Enables strict mode, which helps catch common coding errors 
// (like using undeclared variables) and enforces cleaner JavaScript syntax.

const port = 3000; // The port number where the server will listen for requests.

const http = require("http"); // Imports the built-in Node.js 'http' module to create an HTTP server.
const httpStatus = require("http-status-codes"); // Imports the 'http-status-codes' module for readable HTTP response codes.


// Create an HTTP server instance
const app = http.createServer((request, response) => {
    console.log("Received an incoming request!"); // Logs a message whenever a new request is received.

    // Set the response header with a 200 OK status and specify that the content is HTML.
    response.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    // Define the message to send back to the client
    let responseMessage = "<h1>Hello, Universe!</h1>";

    // Write the response message to the client
    response.write(responseMessage);

    // End the response (this tells Node.js that all data has been sent)
    response.end();

    // Log the message that was sent as a response
    console.log(`Sent a response : ${responseMessage}`);
});

// Start the server and make it listen on the defined port
app.listen(port);

// Log a message to confirm that the server is running
console.log(`The server has started and is listening on port number: ${port}`);
