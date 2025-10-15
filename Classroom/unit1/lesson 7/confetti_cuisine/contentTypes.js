/* ------------------ CONTENT TYPES ------------------ */
// This module exports commonly used Content-Type headers
// for HTTP responses, making it easier to set the correct type
// when serving files like HTML, CSS, JS, images, or plain text.

module.exports = {
  html: { "Content-Type": "text/html" },        // HTML files
  text: { "Content-Type": "text/plain" },       // Plain text
  js:   { "Content-Type": "text/javascript" },  // JavaScript files
  jpg:  { "Content-Type": "image/jpg" },        // JPEG images
  png:  { "Content-Type": "image/png" },        // PNG images
  css:  { "Content-Type": "text/css" }          // CSS files
};
