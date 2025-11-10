// Import required modules
const mongoose = require("mongoose"),          // Mongoose for MongoDB interaction
    Subscriber = require("./models/subscriber"), // Import Subscriber model
    Course = require("./models/course");         // Import Course model

// Declare variables to hold test data
var testCourse, testSubscriber;

// Connect to MongoDB database named 'recipe_db' running locally
mongoose.connect(
    "mongodb://0.0.0.0:27017/recipe_db",
    { useNewUrlParser: true }
);

// Set Mongoose to use native ES6 Promises
mongoose.Promise = global.Promise;

// Remove all existing subscribers from the database
Subscriber.remove({})
    .then((items) => console.log(`Removed ${items.n} records!`))

    // Remove all existing courses from the database
    .then(() => {
        return Course.remove({});
    })
    .then((items) => console.log(`Removed ${items.n} records!`))

    // Create a new subscriber
    .then(() => {
        return Subscriber.create({
            name: "Jon",
            email: "jon@jonwexler.com",
            zipCode: "12345"
        });
    })
    .then(subscriber => {
        console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    })

    // Find the newly created subscriber by name
    .then(() => {
        return Subscriber.findOne({
            name: "Jon"
        });
    })
    .then(subscriber => {
        testSubscriber = subscriber;
        console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    })

    // Create a new course
    .then(() => {
        return Course.create({
            title: "Tomato Land",
            description: "Locally farmed tomatoes only",
            zipCode: 12345,
            items: ["cherry", "heirloom"]
        });
    })
    .then(course => {
        testCourse = course;
        console.log(`Created course: ${course.title}`);
    })

    // Associate the created course with the subscriber
    .then(() => {
        testSubscriber.courses.push(testCourse);
        testSubscriber.save(); // Save the updated subscriber document
    })

    // Populate the subscriber’s course field with actual course data
    .then(() => {
        return Subscriber.populate(testSubscriber, "courses");
    })
    .then(subscriber => console.log(subscriber))

    // Find all subscribers enrolled in the specific course
    .then(() => {
        return Subscriber.find({
            courses: mongoose.Types.ObjectId(testCourse._id)
        });
    })
    .then(subscriber => console.log(subscriber));
