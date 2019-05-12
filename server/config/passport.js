const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
       User.findOne({email: email}).exec()
       .then(user => {
           if (!user || !user.validPassword(password)) {
               return done(null, false, {message: 'incorrect email or password'});
           }
           return done(null, user);
       }).catch(err => {
           done(err);
       })
   })
)

passport.serializeUser((user, done) => {
    done(null, user.username);
})

passport.deserializeUser((username, done) => {
    User.findOne({username: username}).exec()
    .then(user => {
        done(null, user);
    }).catch(err => {
        done(err);
    })
})
