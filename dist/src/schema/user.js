"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the book schema
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
// Create the user model
const user = mongoose_1.default.model("user", userSchema);
exports.default = user;
