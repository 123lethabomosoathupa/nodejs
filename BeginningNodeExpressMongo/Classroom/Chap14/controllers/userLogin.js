// Import the User model to access user data
const User = require('../models/User');
// Import bcrypt for password hashing and comparison
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Find a user in the database by username
    User.findOne({ username: username })
        .then(user => {
            // If no user is found, render the login page with an error
            if (!user) {
                return res.render('login', { error: 'Invalid username or password' });
            }

            // Compare the submitted password with the hashed password in the database
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    // Password matches, save user ID in session to log them in
                    req.session.userId = user._id;
                    console.log('User logged in, redirecting to home:', user._id); // Debug logging
                    return res.redirect('/');
                } else {
                    // Password does not match, render login page with error
                    return res.render('login', { error: 'Invalid username or password' });
                }
            });
        })
        .catch(err => {
            // Handle unexpected errors and log them
            console.log('Login error:', err);
            return res.render('login', { error: 'Something went wrong' });
        });
};
