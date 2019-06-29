const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
fs = require('fs');

//get all users
router.get('/', (req, res) => {
    User.find().exec()
    .then((users) => {
        res.status(200).json({message: 'Successfully find all users', data: {users}});
    }).catch(err => {
        res.status(500).json({message: err})
    })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (!user) {
            return res.status(404).json({message: 'User not found', data: {user}});
        }
        return res.status(200).json({message: 'Succesfully find the user', data: {user}});
    })
})

//user with given id follow the user with id in the req body
router.put('/:id', (req, res) => {
    let following = req.body.following_id;
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(200)
        }
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if (user.following.indexOf(following) < 0) {
            user.following.push(following);
        }
        user.save()
        .then().catch(err => {
            return res.status(500).json({message: err});
        })
    })
    User.findById(following, (err, user) => {
        if (err) {
            return res.status(200)
        }
        if (!user) {
            return res.status(404).json({message: 'User not found too'});
        }
        if (user.follower.indexOf(req.params.id) < 0) {
            user.follower.push(req.params.id);
        }
        user.save()
        .then(() => {
            return res.status(200).json({message: 'Successfully follow the user', data: {user}})
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    })
})

//unfollow the user with id in the req body
router.delete('/:id', (req, res) => {
    let unfollow = req.body.unfollow_id;
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        user.following.splice(user.following.indexOf(unfollow), 1);
        user.save()
        .then().catch(err => {
            return res.status(500).message(err);
        })
    })
    User.findById(unfollow, (err, user) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        user.follower.splice(user.follower.indexOf(req.params.id), 1);
        user.save()
        .then(() => {
            return res.status(200).json({message: 'Succesfully unfollow the user', data: {user}});
        })
        .catch(err => {
            return res.status(500).message(err);
        })
    })
})

//delete an account by id
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).exec()
    .then(user => {
        if (!user) {
            return res.status(404).json({message:'Could not find the user with given id'});
        }
        return res.status(200).json({message:'Successfully delete the user', data: {user}});
    }).catch(err => {
        res.status(500).json({message: err})
    })
})

module.exports = router;
