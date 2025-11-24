// Import the BlogPost model so we can create new posts in the database
const BlogPost = require('../models/BlogPost.js')
// Path module for handling file paths
const path = require('path')

module.exports = (req, res) => {
    // Get the uploaded image file from the request
    let image = req.files.image

    // Move the uploaded file into the public/img directory
    image.mv(
        path.resolve(__dirname, '..', 'public/img', image.name),
        async (error) => {

            // Create a new blog post in the database
            // Spread operator (...) includes title, body, username, etc. from req.body
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name // Save the image path to the database
            })

            // After saving the post, redirect user back to the homepage
            res.redirect('/')
        }
    )
}
