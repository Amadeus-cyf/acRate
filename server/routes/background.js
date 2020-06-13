const path = require('path');
const multer = require('multer');
const fs = require('fs');
const User = require('../models/userSchema');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './backgrounds',
    filename: (req, file, cb) => {
        cb(null, 'background-' + req.params.id+ path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 10}
})

//change background 
router.put('/:id', upload.single('background'), (req, res) => {
    User.findById(req.params.id).exec()
    .then(user => {
        user.background = req.file.path;
        user.save()
        .then(() => {
            return res.status(200).json({message: 'Successfully upload the background', data: {user}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

module.exports = router;