const Post = require("../models/post")

exports.postById = async (req, res, next, id) => {
    try {
        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({error: "Post not found"})
        }

        req.post = post;

        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}