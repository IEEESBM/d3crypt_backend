const express = require('express')
const router = express.Router()
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
var mongoose = require('mongoose');
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.send("Error " + err)
    }
})

router.get('/u', async (req, res) => {

    try {
       
       
       const pwd = await bcrypt.hash(req.query.password, 10);
        console.log(pwd);
        console.log(req.query.password);
        
        const doc = await User.findByIdAndUpdate(req.query.id, {
            username: req.query.username,
            
            phone: req.query.phone,
            ID: req.query.ID,
            college: req.query.college,
            memNo: req.query.memNo,
            password:pwd
        });
        console.log(doc);
        res.send("Updated");
    } catch (err) {
        res.send(err);
    }
})


router.get('/:idy', async (req, res) => {
    try {
        var final = req.query.id;


        //console.log(final);
        const user = await User.findById(final);
        res.json(user);

    } catch (err) {
        res.send("Error " + err)
    }
})



router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.rank = req.body.rank
        user.points = req.body.points
        const a1 = await user.save()
        res.json(a1)
    } catch (err) {
        res.send("Error " + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const a1 = await user.remove()
        res.send('Removed')
    } catch (err) {
        res.send("Error " + err)
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        points: req.body.points,
        email: req.body.email,
        password: req.body.password,
        attempts: req.body.attempts
    })
    try {
        const a1 = await user.save()
        res.send(a1)
    } catch (err) {
        console.log("Error " + err)
    }
})

module.exports = router
