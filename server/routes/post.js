const express = require("express");
const { getPosts, createPost, updatePost, deletePost } = require("../controllers/post");
const {check} = require("express-validator")
const {userById, loginRequired, isAuthorized} = require("../middlewares/user")
const {postById} = require("../middlewares/post")

const router = express.Router()

router.get("/posts/:userId", loginRequired, isAuthorized, getPosts);

router.post("/posts/:userId", loginRequired, isAuthorized, [
    check("text", "Post text is required").notEmpty()
], createPost);

router.put("/posts/:postId/:userId", loginRequired, isAuthorized, [
    check("text", "Post text is required").notEmpty()
], updatePost);

router.delete("/posts/:postId/:userId", loginRequired, isAuthorized, deletePost);

router.param("userId", userById)
router.param("postId", postById);

module.exports = router;