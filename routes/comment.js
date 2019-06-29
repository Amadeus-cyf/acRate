const mongoose = require('mongoose');
const express = require('express');
const Comment = require('../models/commentSchema');
const router = express.Router();

router.get('/:anime_id', (req, res) => {
    Comment.find({anime_id: req.params.anime_id}, (err, comments) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        return res.status(200).json({message: 'Successfully find all comments of the bangumi', data: {comments}});
    })
})

router.get('/parentcomment/:anime_id', (req, res) => {
    Comment.find({anime_id: req.params.anime_id, parentComment_id: 'none'}, (err, comments) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        return res.status(200).json({message: 'Successfully find all comments of the bangumi', data: {comments}});
    })
})

router.get('/parentcomment/:anime_id/count', (req, res) => {
    Comment.find({anime_id: req.params.anime_id, parentComment_id: 'none'}).countDocuments().exec()
    .then(commentNumber => {
        return res.status(200).json({message: 'Successfully find number of comments', data: {commentNumber}});
    }).catch(err => {8
        return res.status(500).json({messgae: err});
    })
})

router.get('/parentcomment/:anime_id/:page', (req, res) => {
    let page = req.params.page;
    Comment.find({anime_id: req.params.anime_id, parentComment_id: 'none'}).sort({date: -1}).skip((page-1)*20).limit(20).exec()
    .then(comments => {
        return res.status(200).json({message: 'Succesfully find all comments of the page', data: {comments}});
    }).catch(err => {
        return res.status(500).json({messgae: err});
    })
})

router.get('/reply/:_id', (req, res) => {
    Comment.find({parentComment_id: req.params._id}, (err, comments) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        return res.status(200).json({message: 'Succesfully find all replies of the comment', data:{comments}})
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

// update like or dislike of a comment
router.put('/:id', (req, res) => {
    let user_id = req.body.user_id;
    let attitude = req.body.attitude;
    if (attitude === 'like') {
        Comment.findById(req.params.id).exec()
        .then(comment => {
            if (comment.like.includes(user_id)) {
                comment.like.splice(comment.like.indexOf(user_id), 1);
            } else {
                if (comment.dislike.includes(user_id)) {
                    comment.dislike.splice(comment.dislike.indexOf(user_id), 1);
                }
                comment.like.push(user_id);
            }
            comment.save()
            .then(() => {
                return res.status(200).json({message: 'Successfully update the comment', data: {comment}});
            }).catch(err => {
                return res.status(500).json({message: err});
            })
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    } else {
        Comment.findById(req.params.id).exec()
        .then(comment => {
            if (comment.dislike.includes(user_id)) {
                comment.dislike.splice(comment.dislike.indexOf(user_id), 1);
            } else {
                if (comment.like.includes(user_id)) {
                    comment.like.splice(comment.like.indexOf(user_id), 1);
                }
                comment.dislike.push(user_id);
            }
            comment.save()
            .then(() => {
                return res.status(200).json({message: 'Successfully update the comment', data: {comment}});
            }).catch(err => {
                return res.status(500).json({message: err});
            })
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    }
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