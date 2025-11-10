// === homeController.js ===

// Handles GET requests with a URL parameter (e.g., /items/carrot)
exports.sendReqParam = (req, res) => {
    // Extract the "vegetable" parameter from the URL
    let veg = req.params.vegetable;

    // Send a simple text response showing the requested vegetable
    res.send(`This is the page for ${veg}`);
};

// Handles POST requests to the server (e.g., form submissions)
exports.sendPost = (req, res) => {
    // Log the data sent in the request body (e.g., from a form submission)
    console.log(req.body);

    // Log any query string parameters (?key=value)
    console.log(req.query);

    // Send a confirmation response to the client
    res.send("POST Successful!");
};

// Handles GET requests that include a name parameter (e.g., /name/Lethabo)
exports.respondWithName = (req, res) => {
    // Render the "index.ejs" view and pass a variable called "firstName"
    // This variable can be accessed inside the EJS template using <%= firstName %>
    res.render("index", { firstName: req.params.myName });
};

/* 
====================
Summary
====================

This homeController module provides three functions for handling requests:

1. sendReqParam:
   - Extracts a dynamic URL parameter ("vegetable") and responds with a simple text message.
   - Example: GET /items/carrot → "This is the page for carrot".

2. sendPost:
   - Handles POST requests.
   - Logs both the request body (form data or JSON) and any query string parameters.
   - Sends a confirmation message back to the client.

3. respondWithName:
   - Handles GET requests with a dynamic "myName" parameter.
   - Renders an EJS template ("index.ejs") and passes the name to be displayed dynamically.

This separation of route logic into a controller keeps the main server file clean and maintainable.
*/
