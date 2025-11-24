// This controller handles the "Create Post" page.
// It checks if the user is logged in before allowing access.

module.exports = (req, res) => {
    // If the session contains a userId, the user is logged in
    if (req.session.userId) {
        return res.render("create", {
            createPost: true // Pass a flag to the template (optional)
        });
    }

    // If the user is NOT logged in, redirect them to the login page
    res.redirect('/auth/login');
};
