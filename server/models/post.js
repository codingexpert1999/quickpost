const mongoose = require("mongoose");
const Comment = require("./comment")

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User id is required"]
    },
    text: {
        type: String,
        required: [true, "Post text is required"]
    },
    comments: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment",
            }
        ],
        default: []
    }
}, { timestamps: true })

const Post = mongoose.model('post', postSchema);

module.exports = Post;