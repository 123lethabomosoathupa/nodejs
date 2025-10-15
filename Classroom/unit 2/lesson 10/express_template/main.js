const express = require('express');
const app = express();
const port = 3000;

// Built-in middleware to parse JSON
app.use(express.json());

// --- Custom Middleware ---
function logger(req, res, next) {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
}

app.use(logger);

// --- Routes ---
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Lesson 10!</h1>');
});

app.get('/info', (req, res) => {
    res.send('<h2>Info Page</h2>');
});

app.get('/contact', (req, res) => {
    res.send('<h2>Contact Page</h2>');
});

// Route to test error handling
app.get('/error', (req, res) => {
    throw new Error('This is a test error');
});

// --- 404 Handler ---
app.use((req, res) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h1>Something broke!</h1>');
});

// --- Start server ---
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));