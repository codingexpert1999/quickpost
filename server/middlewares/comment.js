const Comment = require("../models/comment")

exports.commentById = async (req, res, next, id) => {
    try {
        const comment = await Comment.findById(id);

        if(!comment){
            return res.status(404).json({error: "Commet not found"})
        }

        req.comment = comment;

        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}