// Middleware to validate post submission
// Ensures that both a file (image) and a title are provided
module.exports = (req, res, next) => {
    // If no file is uploaded or title is missing, redirect back to the "New Post" page
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new');
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
};
