// Import Mongoose to interact with MongoDB
const mongoose = require("mongoose");

// Create a Schema instance
const Schema = mongoose.Schema;

// Define the BlogPost schema
const BlogPostSchema = new Schema({
  title: String,           // Title of the blog post
  body: String,            // Content/body of the blog post
  username: String,        // Author's username
  datePosted: {            // Date when the post was created
    type: Date,
    default: new Date()    // Default to the current date/time
  },
  image: String            // Path to the image associated with the post
});

// Create the BlogPost model based on the schema
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

// Export the model to use it in controllers
module.exports = BlogPost;
