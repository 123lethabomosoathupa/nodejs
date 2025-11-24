// This controller renders the user registration page.
// It also sends any validation error messages (from flash) to the view.

module.exports = (req, res) => {
    res.render('register', {
        errors: req.flash('validationErrors') // Pass validation errors to the template
    });
};
