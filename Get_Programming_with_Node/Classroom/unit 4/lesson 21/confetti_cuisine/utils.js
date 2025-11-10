// Import Node.js filesystem module
const fs = require("fs");

// Import HTTP status codes constants
const httpStatus = require("http-status-codes");

// Import content types (e.g., MIME types)
const contentTypes = require("./contentTypes");

module.exports = {
  // --- Serve a file as HTTP response ---
  getFile: (file, res) => {
    // Read file from the file system
    fs.readFile(`./${file}`, (error, data) => {
      if (error) {
        // If there is an error reading the file, respond with 500 Internal Server Error
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
        return res.end("There was an error serving content!"); // Send error message
      }
      // If file read successfully, send file data as response
      res.end(data);
    });
  }
};
