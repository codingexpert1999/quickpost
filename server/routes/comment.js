const express = require("express");
const { createComment, updateComment, deleteComment } = require("../controllers/comment");
const {check} = require("express-validator")
const {userById, loginRequired, isAuthorized} = require("../middlewares/user")
const {postById} = require("../middlewares/post")
const {commentById} = require("../middlewares/comment")

const router = express.Router()

router.post("/comments/:postId/:userId", loginRequired, isAuthorized, [
    check("text", "Comment text is required").notEmpty()
], createComment);

router.put("/comments/:commentId/:userId", loginRequired, isAuthorized, [
    check("text", "Comment text is required").notEmpty()
], updateComment);

router.delete("/comments/:commentId/:userId", loginRequired, isAuthorized, deleteComment);

router.param("userId", userById)
router.param("postId", postById);
router.param("commentId", commentById);

module.exports = router;