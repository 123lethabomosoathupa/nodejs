// Import the User model to interact with the users collection
const User = require('../models/User.js')
// Path module (not used here, but commonly used for file handling)
const path = require('path')

module.exports = async (req, res) => {  
    try {
        // Attempt to create a new user in the database with the submitted form data
        const user = await User.create(req.body);

        // If successful, redirect to the homepage
        res.redirect('/');
    } catch (error) {
        // If validation or other errors occur, handle them

        if (error.errors) {
            // Extract validation error messages from Mongoose error object
            const validationErrors = Object.keys(error.errors)
                .map(key => error.errors[key].message);
            
            // Store validation errors in flash messages to show on the registration page
            req.flash('validationErrors', validationErrors);
        } else {
            // Generic error message for unexpected errors
            req.flash('validationErrors', ['An error occurred during registration']);
        }

        // Redirect back to the registration page so user can fix errors
        return res.redirect('/auth/register');
    }
}
