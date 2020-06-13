const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).exec()
    .then(user => {
        return done(null, user);
    }).catch(err => {
        return done(err);
    })
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    }, (email, password, done) => {
    User.findOne({'email': email})
    .then(user => {
        if (!user || !user.validPassword(password)) {
            return done(null, false, {message: 'incorrect email or password'});
        }
        return done(null, user);
    }).catch(err => {
        return done(err);
    })
}))

