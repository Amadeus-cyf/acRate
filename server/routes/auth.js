const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
const passport = require('passport');

//login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.json({
                status: "Could not find user"
          });
      }
      req.logIn(user, function(err) {
          if (err) {
              return res.status(500).json({
                  status: "Server error"
              });
          }
          res.status(200).json({
              status: 'Successfully Login'
          });
  
      });
    })(req, res, next);
});

//get current loggin user
router.get('/currentUser', (req, res, next) => {
    if (req.isAuthenticated()) {
       return res.send(req.user)
    }
    return res.send('not login');
})

//sign up an account
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
    let username = req.body.username;
    let email = req.body.email;
    //check if the username and email are unique and send message. unique validator is used to prevent data sent to database.
    User.findOne({'username': username}).exec()
    .then(user => {
        if (user) {
            return res.json({message: 'Username already exists', data:{}});
        }
    }).catch(err => {
        res.status(500).send(err);
    })
    User.findOne({'email': email})
    .then(user => {
        if (user) {
            return res.json({message: 'Email already exists', data:{}});
        }
    }).catch(err => {
        res.status(500).send(err);
    })
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save()
    .then(() => {
        return res.status(200).json({message:'Account created', data:{user}});
    }).catch(err => {
        return res.status(500).json({message: "Error: creating a new user " + err});
    })
})

//logout
router.post('/logout', (req, res) => {
    req.logOut();
    res.send('logout')
})

module.exports = router;