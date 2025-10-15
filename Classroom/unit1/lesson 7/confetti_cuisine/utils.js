// Import modules
const fs = require("fs");                        // Node.js file system module
const httpStatus = require("http-status-codes"); // For readable HTTP status codes
const contentTypes = require("./contentTypes");  // Content-Type definitions

/* ------------------ UTILITY FUNCTIONS ------------------ */
module.exports = {
  // Function to read and serve a file to the client
  getFile: (file, res) => {
    fs.readFile(`./${file}`, (error, data) => {
      if (error) {
        // If an error occurs while reading the file, respond with 500 Internal Server Error
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
        return res.end("There was an error serving content!");
      }
      // Send the file content as response
      res.end(data);
    });
  }
};
