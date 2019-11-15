const path = require("path");
const multer = require("multer");
const fs = require('fs');
const User = require('../models/userSchema');
const Comment = require('../models/commentSchema');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './avatars',
    filename: (req, file, cb) => {
        cb(null, 'avatar-' + req.params.id + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5}
})

//change avatar
router.put('/:id', upload.single('avatar'), (req, res) => {
    Comment.find({user_id: req.params.id})
    .then(comments => {
        if (comments.length > 0) {
            comments.forEach(comment => {
                comment.avatar = req.file.path;
                comment.save()
            })
        }
    }).catch(err => {
        return res.status(500).json({message: err});
    })
    User.findById(req.params.id).exec()
    .then(user => {
        user.avatar = req.file.path
        user.save()
        .then(() => {
            return res.status(200).json({message: 'Successfully upload the avatar', data: {user}});
        })
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

module.exports = router;