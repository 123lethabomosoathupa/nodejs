// Middleware to prevent logged-in users from accessing certain routes
// For example, login or registration pages
module.exports = (req, res, next) => {
    // If a user ID exists in the session, the user is already logged in
    if (req.session.userId) {
        return res.redirect('/'); // Redirect logged-in users to the homepage
    }

    // If not logged in, allow them to proceed to the requested route
    next();
};
