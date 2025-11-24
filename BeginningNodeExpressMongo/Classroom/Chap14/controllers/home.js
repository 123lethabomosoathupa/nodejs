// Import the BlogPost model to interact with the blog posts collection
const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    try {
        // Find all blog posts from the database
        const blogposts = await BlogPost.find({});
        
        // Render the homepage (index.ejs) and pass the list of posts to the view
        res.render('index', {
            blogposts
        });
    } catch (error) {
        // Log any errors that occur during the database request
        console.error('Error fetching blog posts:', error);

        // Render the homepage with an empty list if something goes wrong
        res.render('index', {
            blogposts: []
        });
    }
};
