// This controller handles logging out the user.
// It destroys the current session and then redirects to the homepage.

module.exports = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); // After logout, send user back to home page
  });
};
