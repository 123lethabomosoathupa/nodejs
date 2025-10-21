"use strict";
const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber");
mongoose.connect("mongodb://127.0.0.1:27017/confetti_cuisine", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
const subscribers = [
    { name: "John Doe", email: "john@example.com", zipCode: 12345 },
    { name: "Jane Smith", email: "jane@example.com", zipCode: 67890 }
];
Subscriber.deleteMany()
    .then(() => {
        return Promise.all(
            subscribers.map(s => Subscriber.create(s))
        );
    })
    .then(results => {
        console.log("■ Database seeded:", results);
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(error);
    });
