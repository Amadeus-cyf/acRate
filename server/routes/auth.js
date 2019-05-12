const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
const passport = require('passport');
    
router.post('/login', 
  passport.authenticate('local', { successRedirect: '/', 
  failureRedirect: '/login', failureFlash: 'Incorrect email or password'})
);

  
router.post('/signup', (req, res) => {
    let user = new User();
    if (!req.body.username) {
        return res.send('Please enter username');
    }
    if (!req.body.email) {
        return res.send('Please enter email');
    }
    if (!req.body.email.includes('@')) {
        return res.send('Invalid email');
    }
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save()
    .then(() => {
        return res.status(200).send('Account created');
    }).catch(err => {
        return res.status(500).send({data: "error", message: "Error: creating a new user " + error});
    })
})

router.get('/', (req, res) => {
    User.find({}).exec()
    .then((users) => {
        res.status(200).send(users);
    }).catch(err => {
        res.status(500).send(err);
    })
})
module.exports = router;