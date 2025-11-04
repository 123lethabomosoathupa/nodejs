"use strict";

const httpStatus = require("http-status-codes");

module.exports = {
  // === 404 Page Not Found ===
  pageNotFoundError: (req, res) => {
    const errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    // Render a 404 view if you have one
    res.render("404", {
      title: "Page Not Found",
      message: "Sorry, the page you are looking for does not exist."
    });
  },

  // === 500 Internal Server Error ===
  internalServerError: (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log("ERROR occurred: ${error.stack}");
    res.status(errorCode);
    res.send('${errorCode} | Sorry, our application is experiencing a problem!');
  }
};
