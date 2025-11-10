"use strict";

/*
===========================================
 REPL.JS — FUNDAMENTAL OVERVIEW
-------------------------------------------
This script is a standalone Node.js program that uses
Mongoose (a MongoDB library) to test and verify data models.

🧠 WHAT IT DOES:
1. Connects to a local MongoDB database (recipe_db).
2. Clears all existing Course and Subscriber documents.
3. Creates a new Course and a new Subscriber.
4. Links the Subscriber to the Course.
5. Uses `.populate()` to fetch full course data for the subscriber.
6. Displays the results and closes the database connection.

⚙️ PURPOSE:
This file is not part of the main web app.
It’s a **database testing and learning tool** that helps confirm
that your Mongoose models and relationships work correctly.

In simple terms:
It creates data → links it → displays it → then closes the database.
===========================================
*/

// === Import Mongoose and Models ===
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber"); // Mongoose model for subscribers
const Course = require("./models/course");         // Mongoose model for courses

// === Connect to MongoDB ===
mongoose.connect("mongodb://localhost:27017/recipe_db", {
    useNewUrlParser: true,     // Enables the new MongoDB connection string parser
    useUnifiedTopology: true   // Ensures stable connection management
});

// Use global Promise for async handling
mongoose.Promise = global.Promise;

// === Once the database connection opens, run main logic ===
mongoose.connection.once("open", async () => {
    console.log("■ Connected to MongoDB");

    try {
        // --- 1️⃣ Clear existing data from collections ---
        await Subscriber.deleteMany({});
        await Course.deleteMany({});

        // --- 2️⃣ Create a new Course document ---
        const course = await Course.create({
            title: "Intro to Samosas",
            description: "Learn how to make the perfect samosas!",
            items: ["Flour", "Spices", "Potatoes"],
            zipCode: 12345
        });
        console.log("■ Course created:", course.title);

        // --- 3️⃣ Create a new Subscriber document ---
        const subscriber = await Subscriber.create({
            name: "Lethabo Mosoathupa",
            email: "lethabo.mosoathupa8@gmail.com",
            zipCode: 12345
        });
        console.log("■ Subscriber created:", subscriber.getInfo());

        // --- 4️⃣ Link the subscriber to the course ---
        subscriber.courses.push(course._id); // Store the course ID in subscriber’s courses array
        await subscriber.save();             // Save changes to the database

        // --- 5️⃣ Retrieve subscriber data with populated course info ---
        const populatedSub = await Subscriber.findOne({
            email: "lethabo.mosoathupa8@gmail.com"
        })
            .populate("courses") // Replace course IDs with full course documents
            .exec();

        // --- 6️⃣ Display the result ---
        console.log("\n=== Subscriber with Populated Courses ===");
        console.log(populatedSub);

    } catch (err) {
        // --- 7️⃣ Catch and display any errors ---
        console.error("■ Error:", err.message);

    } finally {
        // --- 8️⃣ Always close the connection after running ---
        mongoose.connection.close();
        console.log("■ MongoDB connection closed.");
    }
});
