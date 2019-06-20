const path = require('path');
const multer = require('multer');
const fs = require('fs');
const User = require('../models/userSchema');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, 'background-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000}
})

//change background 
router.put('/:id', upload.single('background'), (req, res) => {
    User.findById(req.params.id).exec()
    .then(user => {
        user.background.data = fs.readFileSync(req.file.path);
        user.background.contentType = 'image/jpeg';
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