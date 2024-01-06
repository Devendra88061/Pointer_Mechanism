import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return isEmail(v);
            },
            message: (props: { value: any; }) => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profilePicture: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
});
// Create the User model
const Users = mongoose.model("Users", userSchema);
export default Users;
