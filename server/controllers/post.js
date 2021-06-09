const Post = require('../models/post')
const {validationResult} = require("express-validator")

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", ['username']).sort({_id: -1}).populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username"
            }
        }).sort({_id: -1});

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

exports.createPost = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {text} = req.body;

        let post = await Post.create({
            user: req.user.id,
            text
        })

        post = await post.populate("user", ['username']).execPopulate()

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

exports.updatePost = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {text} = req.body;

        const post = await Post.findByIdAndUpdate(req.post.id, {text}).populate("user", ["username"])

        post.text = text;

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.post.id)

        res.json({message: "Post deleted successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}