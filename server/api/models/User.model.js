import mongoose from "mongoose";

const role = ["user", "admin"];
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: role,
        default: "user"
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;