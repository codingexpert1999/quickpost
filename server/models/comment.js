const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"]
    },
    text: {
        type: String,
        required: [true, "Comment text is required"]
    }
}, { timestamps: true })

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;