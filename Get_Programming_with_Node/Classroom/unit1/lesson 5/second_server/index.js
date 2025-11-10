// Import required modules
const port = 3000; // The port number where the server will listen for requests
const http = require("http"); // Node.js built-in HTTP module for creating web servers
const httpStatus = require("http-status-codes"); // Module for using readable HTTP status codes

// Create the server instance
const app = http.createServer();

// Utility function to format objects as JSON strings for easy logging
const getJSONString = obj => {
    return JSON.stringify(obj, null, 2); // Converts object to formatted JSON string
};

// Event listener for incoming HTTP requests
app.on("request", (req, res) => {
    let body = []; // Array to store incoming data chunks

    // Event triggered when data is received from the client
    req.on("data", (bodyData) => {
        body.push(bodyData); // Add each chunk of data to the array
    });

    // Event triggered when the request data has been fully received
    req.on("end", () => {
        body = Buffer.concat(body).toString(); // Combine chunks and convert to string
        console.log(`Request Body Contents: ${body}`); // Log the request body
    });

    // Log details of the request
    console.log(`Method: ${getJSONString(req.method)}`); // Logs HTTP method (GET, POST, etc.)
    console.log(`URL: ${getJSONString(req.url)}`); // Logs requested URL
    console.log(`Headers: ${getJSONString(req.headers)}`); // Logs request headers

    // Send a response back to the client
    res.writeHead(httpStatus.OK, { // Send HTTP 200 OK response header
        "Content-Type": "text/html" // Set response content type to HTML
    });

    let responseMessage = "<h1>This will show on the screen.</h1>"; // The HTML response body
    res.end(responseMessage); // End the response and send it to the client
});

// Start the server and listen on the specified port
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
