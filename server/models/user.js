const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User;