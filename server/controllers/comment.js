const Comment = require('../models/comment')
const {validationResult} = require("express-validator")

exports.createComment = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {text} = req.body;

        let comment = await Comment.create({
            user: req.user.id,
            text
        })

        comment = await comment.populate("user", ['username']).execPopulate()

        req.post.comments.unshift(comment)

        await req.post.save();

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

exports.updateComment = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {text} = req.body;

        const comment = await Comment.findByIdAndUpdate(req.comment.id, {text}).populate("user", ["username"])

        comment.text = text;

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.comment.id)

        res.json({message: "Comment deleted successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}