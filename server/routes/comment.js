const mongoose = require('mongoose');
const express = require('express');
const Comment = require('../models/commentSchema');
const router = express.Router();

router.get('/:anime_id', (req, res) => {
    Comment.find({anime_id: req.params.anime_id}).exec()
    .then(comments => {
        return res.status(200).json({message: 'Successfully find all comments of the bangumi', data: {comments}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.post('/', (req, res) => {
    let comment = new Comment(req.body);
    comment.save()
    .then(() => {
        return res.status(201).json({message: 'Successfully upload the comment', data: {comment}})
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.delete('/:id', (req, res) => {
   Comment.findByIdAndRemove(req.params.id).exec()
   .then(comment => {
       if (!comment) {
           return res.status(404).json({message: 'Comment not found', data: {}});
       }
       return res.status(200).json({message: 'Successfully delete the comment', data: {comment}});
   }).catch(err => {
       return res.status(500).json({message: err});
   })
})
module.exports = router;