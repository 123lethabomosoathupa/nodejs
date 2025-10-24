// models/subscriber.js
"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;
const subscriberSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid email address"]
        },
        zipCode: {
            type: Number,
            required: [true, "Zip Code required"],
            min: [10000, "Zip Code too short"],
            max: [99999, "Zip Code too long"]
        },
        courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
    },
    {
        timestamps: true
    }
);
subscriberSchema.methods.getInfo = function () {
    return `Name: ${this.name} | Email: ${this.email} | Zip Code: ${this.zipCode}`;
};
subscriberSchema.statics.findByZip = function (zip) {
    return this.find({ zipCode: zip });
};
module.exports = mongoose.model("Subscriber", subscriberSchema);