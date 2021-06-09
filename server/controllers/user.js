const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")

const jwtSecret = "mysecret"

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {username, password, email} = req.body;

        const encrypterPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: encrypterPassword
        })

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        jwt.sign(payload, jwtSecret, (err, token) => {
            if(err) throw err;

            res.json({user: payload, token})
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {password, email} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({error: "Email or password is incorrect!"})
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        jwt.sign(payload, jwtSecret, (err, token) => {
            if(err) throw err;

            res.json({user: payload, token})
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.changeUsername = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {username} = req.body;

        const user = await User.findByIdAndUpdate(req.user.id, {username});
        
        const payload = {
            id: user.id,
            username,
            email: user.email
        }

        jwt.sign(payload, jwtSecret, (err, token) => {
            if(err) throw err;

            res.json(token)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.changeEmail = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {email} = req.body;

        const user = await User.findByIdAndUpdate(req.user.id, {email});

        const payload = {
            id: user.id,
            username: user.username,
            email
        }

        jwt.sign(payload, jwtSecret, (err, token) => {
            if(err) throw err;

            res.json(token)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.changePassword = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {password} = req.body;

        const encrypterPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(req.user.id, {password: encrypterPassword});

        res.json({message: "Password updated successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}