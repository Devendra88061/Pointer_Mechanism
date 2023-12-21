import mongoose from "mongoose";

// Define the book schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    hobbies:{
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
// Create the user model
const user = mongoose.model("user", userSchema);
export default user;
