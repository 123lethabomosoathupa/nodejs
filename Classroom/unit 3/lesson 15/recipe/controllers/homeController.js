"use strict";
exports.showHome = (req, res) => {
    res.render("index");
};
exports.showCourses = (req, res) => {
    res.render("courses", {
        offeredCourses: [
            "Italian Cooking",
            "Vegetarian Dishes",
            "Baking Basics",
            "Sushi for Beginners"
        ]
    });
};