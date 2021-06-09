const express = require("express");
const { signup, login, changeEmail, changeUsername, changePassword } = require("../controllers/user");
const {check} = require("express-validator")
const {userById, loginRequired, isAuthorized} = require("../middlewares/user")

const router = express.Router()

router.post("/signup", [
    check("username", "Username is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty()
], signup)

router.post("/login", [
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty()
], login)

router.put("/user/username/:userId", loginRequired, isAuthorized, [
    check("username", "Username is required").notEmpty(),
], changeUsername)

router.put("/user/email/:userId", loginRequired, isAuthorized, [
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
], changeEmail)

router.put("/user/password/:userId", loginRequired, isAuthorized, changePassword);

router.param("userId", userById)

module.exports = router;