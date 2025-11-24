// Import the User model to access user data
const User = require('../models/User');

// Middleware to protect routes (only allow access if user is logged in)
module.exports = async (req, res, next) => {
    try {
        // Find the user by ID stored in the session
        const user = await User.findById(req.session.userId);

        // If no user is found (not logged in), redirect to homepage
        if (!user) {
            return res.redirect('/');
        }

        // User exists, allow request to proceed
        next();
    } catch (error) {
        // If any error occurs (e.g., invalid session), redirect to homepage
        return res.redirect('/');
    }
};
