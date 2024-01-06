import mongoose from "mongoose";

// Define the User schema
const pointerSchema = new mongoose.Schema({
    userId : {
        type: Number,
        required: true,
    },
    sessionId: {
        type: Number,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Create the User model
const pointer = mongoose.model("Pointer", pointerSchema);
export default pointer;
