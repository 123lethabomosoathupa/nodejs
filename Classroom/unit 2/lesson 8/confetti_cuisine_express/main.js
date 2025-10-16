// Define the port number for the server
const port = 3000,

  // Import Express.js module
  express = require("express"),

  // Create an instance of an Express application
  app = express();

// Define a route handler for GET requests to the root URL ("/")
app.get("/", (req, res) => {
  res.send("Hello, Universe!"); // Send a plain text response to the client
})

// Start the server and listen on the defined port
.listen(port, () => {
  // Callback function executed once the server starts
  console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
