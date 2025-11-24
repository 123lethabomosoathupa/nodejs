// Import the BlogPost model so we can fetch posts from the database
const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    // Find a blog post by its ID from the URL parameter (:id)
    const blogpost = await BlogPost.findById(req.params.id)

    // Render the "post" EJS template and pass the blog post data to it
    res.render('post', { blogpost })
}
