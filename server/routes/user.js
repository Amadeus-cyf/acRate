const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();

//get all users
router.get('/', (req, res) => {
    User.find({}).exec()
    .then((users) => {
        res.status(200).json({message: 'Successfully find all users', data: {users}});
    }).catch(err => {
        res.status(500).send(err);
    })
})


//delete an account by id
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if (!user) {
            return res.status(404).json({message:'Could not find the user with given id'});
        }
        return res.status(200).json({message:'Successfully delete the user', data: {user}});
    }).catch(err => {
        return res.send(err);
    })
});

module.exports = router;
