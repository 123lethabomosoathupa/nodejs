"use strict"; // ✅ Enforce strict mode for safer and cleaner JavaScript

// -------------------------
// Home Controller
// -------------------------
// Handles requests for the homepage and contact page views.

module.exports = {
  // -------------------------------------------------
  // 🏠 INDEX — Render the homepage
  // -------------------------------------------------
  index: (req, res) => {
    // Renders the "index.ejs" file from the views directory
    res.render("index");
  },

  // -------------------------------------------------
  // 📞 CONTACT — Render the contact page
  // -------------------------------------------------
  contact: (req, res) => {
    // Renders the "contact.ejs" file from the views directory
    res.render("contact");
  }
};
