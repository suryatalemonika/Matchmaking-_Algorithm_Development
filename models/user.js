const mongoose = require("mongoose");
require("dotenv").config()

const userSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        interested_in: { type: String, required: true },
        location: { type: String, required: true },
        hobbies: { type: [String], required: true },
        interests: { type: [String], required: true },
        occupation: { type: String, required: true },
        education_level: { type: String, required: true },
        personality_traits: { type: [String], required: true }
    },
    { collection: process.env.USER_COLLECTION }
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
