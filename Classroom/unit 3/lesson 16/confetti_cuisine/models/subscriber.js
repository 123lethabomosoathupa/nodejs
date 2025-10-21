"use strict";
const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number,
    userAccount: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("Subscriber", subscriberSchema);