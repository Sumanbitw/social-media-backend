const express = require('express')
const mongoose = require('mongoose')
const app = require('../../app')
const router = express.Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
require("dotenv/config")
const User = require("../model/user.model")


router.get('/signup',async(req, res, next) => {
    try{
    const allUser = await User.find()
    res.status(200).json(allUser)
    }catch(error){
        res.status(500).json({
            message : error
        })
    }
})

router.post("/signup", async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const userExists = await User.findOne({ email : req.body.email })
    if (userExists){
        return res.json({ message : "User already exists" })
    }else {
        const user = new User({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            })
        try {    
        const savedUser = await user.save()
        const token = jwt.sign({
            userId : savedUser._id,
            email : savedUser.email
        }, process.env.JWT_KEY, {expiresIn : "1d"})
        console.log(savedUser)
        res.status(201).json({message : "Account created ", token : token})
        }catch(error) {
        console.log(error)
        res.status(500).json({
            message : error
        }) 
    }  
   }      
})

    router.delete('/signup/:userId', async (req, res, next) => {
        try{
        const removeUser =  await User.remove({ _id : req.params.userId })
        res.status(200).json(removeUser)
    }catch(error){
        res.status(500).json({
            message : error
        })
    }    
    })

    router.post('/login',async (req, res, next) => {
    const user = await User.findOne({ email : req.body.email })
    !user && res.status(401).json({ message : "Auth login failed" })

    const validatePassword = await bcrypt.compare(req.body.password, user.password)
        !validatePassword && res.status(401).json({ message : "Wrong Password" })

        try{
        const token = jwt.sign({ 
            userId : user._id,
            email : user.email,
        }, process.env.JWT_KEY, {expiresIn : "1d"})
        res.status(200).json({ message : "Succesfully login", token : token})
        }catch(error) {
            res.status(500).json({
                message : error
            })
        }
    })
    
module.exports = router