"use strict";
const mongoose = require("mongoose"),
    Course = require("./models/course"),
    User = require("./models/user"),
    Subscriber = require("./models/subscriber");
mongoose.connect("mongodb://127.0.0.1:27017/confetti_cuisine", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
let testCourse;
let testUser;
let testSubscriber;
Course.deleteMany()
    .then(() => {
        return Course.create({
            title: "Vegetarian Dishes",
            description: "A course on healthy vegetarian meals",
            items: ["Salad", "Stir-fry", "Smoothies"]
        });
    })
    .then(course => {
        testCourse = course;
        console.log("■ Course created:", testCourse.title);
        return User.create({
            name: { first: "Lethabo", last: "Mosoathupa" },
            email: "lethabo@example.com",
            zipCode: 1900
        });
    })
    .then(user => {
        testUser = user;
        testUser.courses.push(testCourse);
        return testUser.save();
    })
    .then(() => {
        console.log("■ User linked to course!");
        return Subscriber.create({
            name: `${testUser.name.first} ${testUser.name.last}`,
            email: testUser.email,
            zipCode: testUser.zipCode,
            userAccount: testUser
        });
    })
    .then(subscriber => {
        testSubscriber = subscriber;
        console.log("■ Subscriber linked to user account!");
        return Subscriber.populate(testSubscriber, "userAccount");
    })
    .then(subscriber => {
        console.log("■ Linked subscriber:", subscriber);
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(error);
    });
