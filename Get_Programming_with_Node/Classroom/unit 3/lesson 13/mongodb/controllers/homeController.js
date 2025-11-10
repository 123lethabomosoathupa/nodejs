/*
========================================
 homeController.js
----------------------------------------
 SUMMARY:
 This controller handles main route logic for the Express application.
 It includes:
   - Responding to dynamic URL parameters (/items/:vegetable)
   - Handling POST requests and displaying submitted data
   - Rendering an EJS view that displays a name passed from the URL
========================================
*/

// Handles GET requests with a URL parameter (e.g., /items/carrot)
exports.sendReqParam = (req, res) => {
  // Extract the "vegetable" parameter from the URL
  let veg = req.params.vegetable;

  // Send a simple text response showing the requested vegetable
  res.send(`This is the page for ${veg}`);
};

// Handles POST requests (e.g., form submissions)
exports.sendPost = (req, res) => {
  // Log data sent in the request body (useful for debugging form input)
  console.log(req.body);

  // Log any query string parameters (e.g., ?key=value)
  console.log(req.query);

  // Send a success response to confirm the POST request worked
  res.send("POST Successful!");
};

// Handles GET requests with a name parameter (e.g., /name/Lethabo)
exports.respondWithName = (req, res) => {
  // Render the "index.ejs" view, passing in a variable called "firstName"
  // This allows the EJS page to dynamically display the user's name
  res.render("index", { firstName: req.params.myName });
};
