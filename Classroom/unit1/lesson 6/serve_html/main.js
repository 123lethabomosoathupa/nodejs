// Define server port and import required modules
const port = 3000,
    http = require("http"),                // Core HTTP module for creating the server
    httpStatus = require("http-status-codes"), // For readable HTTP status codes
    fs = require("fs");                    // File system module for reading files

// -------------------------------
// 1️⃣ Basic Route Map Example
// -------------------------------
const routeMap = {
    "/": "views/index.html"               // Map URL paths to specific files
};

// Create a simple HTTP server
http.createServer((req, res) => {
    // Always respond with HTML
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    // If the requested URL exists in routeMap, serve that file
    if (routeMap[req.url]) {
        fs.readFile(routeMap[req.url], (error, data) => {
            res.write(data);              // Write file contents to the response
            res.end();                    // End response
        });
    } else {
        // If the URL isn’t mapped, show a “not found” message
        res.end("<h1>Sorry, not found.</h1>");
    }
})
    .listen(port);                         // Start listening on the defined port
console.log(`The server has started and is listening on port number: ${port}`);


// -------------------------------
// 2️⃣ Dynamic View Path Example
// -------------------------------

// Function to generate view file path based on requested URL
const getViewUrl = (url) => {
    return `views${url}.html`;             // Example: "/about" → "views/about.html"
};

// Another HTTP server that uses dynamic URL-to-file mapping
http.createServer((req, res) => {
    let viewUrl = getViewUrl(req.url);     // Build path to requested view file

    // Attempt to read the file and respond
    fs.readFile(viewUrl, (error, data) => {
        if (error) {
            // If file not found, respond with 404
            res.writeHead(httpStatus.NOT_FOUND);
            res.write("<h1>FILE NOT FOUND</h1>");
        } else {
            // If file exists, send its contents
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            });
            res.write(data);
        }
        res.end();                         // End the response
    });
})
    .listen(port);
console.log(`The server has started and is listening on port number: ${port}`);


// -------------------------------
// 3️⃣ Static File Server Example
// -------------------------------

// Function to send a 404 Not Found response
const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

// Create another HTTP server that serves different file types
http
    .createServer((req, res) => {
        let url = req.url;

        // Serve HTML files
        if (url.indexOf(".html") !== -1) {
            res.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
            customReadFile(`./views${url}`, res);

        // Serve JavaScript files
        } else if (url.indexOf(".js") !== -1) {
            res.writeHead(httpStatus.OK, { "Content-Type": "text/javascript" });
            customReadFile(`./public/js${url}`, res);

        // Serve CSS files
        } else if (url.indexOf(".css") !== -1) {
            res.writeHead(httpStatus.OK, { "Content-Type": "text/css" });
            customReadFile(`./public/css${url}`, res);

        // Serve PNG image files
        } else if (url.indexOf(".png") !== -1) {
            res.writeHead(httpStatus.OK, { "Content-Type": "image/png" });
            customReadFile(`./public/images${url}`, res);

        // If file type not supported, show error
        } else {
            sendErrorResponse(res);
        }
    })
    .listen(3000);                          // Server listens on port 3000
console.log(`The server is listening on port number: ${port}`);

// Function to read files safely and send them in the response
const customReadFile = (file_path, res) => {
    // Check if file exists
    if (fs.existsSync(file_path)) {
        fs.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);     // Send 404 if there’s a read error
                return;
            }
            res.write(data);                // Write file contents
            res.end();                      // End the response
        });
    } else {
        sendErrorResponse(res);             // Send 404 if file doesn’t exist
    }
};


// -------------------------------
// 4️⃣ Router-Based Server Example
// -------------------------------

// Re-import modules for this section
http = require("http"),
    httpStatusCodes = require("http-status-codes"),
    router = require("./router"),          // Custom router module
    fs = require("fs"),
    plainTextContentType = { "Content-Type": "text/plain" }, // Text response type
    htmlContentType = { "Content-Type": "text/html" },       // HTML response type

    // Custom helper to read a file and send it in the response
    customReadFile = (file, res) => {
        fs.readFile(`./${file}`, (errors, data) => {
            if (errors) {
                console.log("Error reading the file...");
            }
            res.end(data);
        });
    };

// Define router behavior for GET and POST requests
router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("INDEX");                      // Respond with plain text
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res); // Serve index.html file
});

router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");                     // Respond to POST request
});

// Create a server using the router’s handler function
http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);
