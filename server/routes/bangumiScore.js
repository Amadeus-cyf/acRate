const mongoose = require('mongoose');
const express = require('express');
const BangumiScore = require('../models/bangumiScoreSchema');
const router = express.Router();
var Promise = require('bluebird');

// get the score info of an anime by anime_id
router.get('/:anime_id', (req, res) => {
    BangumiScore.find({anime_id: req.params.anime_id}).exec()
    .then(bangumiScore => {
        if (bangumiScore.length === 0) {
            return res.status(404).json({message: 'Bangumi not found', data:{}});
        }
        return res.status(200).json({message: 'Successfully find the score of bangumi', data: {bangumiScore}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

// post for test
router.post('/', (req, res) => {
    let bangumiScore = new BangumiScore(req.body);
    let anime_id = req.body.anime_id;
    BangumiScore.findOne({anime_id: anime_id}, (err, resultBangumiScore) => {
        if (err) {
            return res.json({message: err});
        }
        if (resultBangumiScore) {
            return res.json({message: 'Bangumi already exists'});
        }
        bangumiScore.save()
        .then(() => {
            return res.status(201).json({message: 'Succuesfully created the bangumiScore', data: {bangumiScore}})
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    })
})

//delete by id
router.delete('/:id', (req, res) => {
    BangumiScore.findByIdAndRemove(req.params.id).exec()
    .then(bangumiScore => {
        if (!bangumiScore) {
            return res.status(404).json({message: 'Bangumi not found', data: {}});
        }
        return res.status(200).json({message: 'Successfully delete all score info of the bangumi', data: {bangumiScore}})
    }).catch(err => {
        return res.status(500).json({message: err})
    })
})

//update score of the anime
router.put('/:anime_id', (req, res) => {
    let score = req.body.score;
    let user_id = req.body.user_id;
    if (!score || score > 5 || !user_id) {
        return res.status.json({message: 'Invalid score or user id'});
    }
    if (score === '1') {
        BangumiScore.findOneAndUpdate({anime_id: req.params.anime_id}, 
            {$push: {'animeScores.score_1': user_id}},
            { new: true },
            (err, bangumi) => {
                if (err) {
                    return res.status(500).json({message: err});
                }
                return res.status(200).json({message: 'Succesfully update score of bangumi', data: {bangumi}});
            }
        );
    } else if (score === '2') {
        BangumiScore.findOneAndUpdate({anime_id: req.params.anime_id}, 
            {$push: {'animeScores.score_2': user_id}},
            { new: true },
            (err, bangumi) => {
                if (err) {
                    return res.status(500).json({message: err});
                }
                return res.status(200).json({message: 'Succesfully update score of bangumi', data: {bangumi}});
            }
        );
    } else if (score === '3') {
        BangumiScore.findOneAndUpdate({anime_id: req.params.anime_id}, 
            {$push: {'animeScores.score_3': user_id}},
            { new: true },
            (err, bangumi) => {
                if (err) {
                    return res.status(500).json({message: err});
                }
                return res.status(200).json({message: 'Succesfully update score of bangumi', data: {bangumi}});
            }
        );
    } else if (score === '4') {
        BangumiScore.findOneAndUpdate({anime_id: req.params.anime_id}, 
            {$push: {'animeScores.score_4': user_id}},
            { new: true },
            (err, bangumi) => {
                if (err) {
                    return res.status(500).json({message: err});
                }
                return res.status(200).json({message: 'Succesfully update score of bangumi', data: {bangumi}});
            }
        );
    } else if (score === '5') {
        BangumiScore.findOneAndUpdate({anime_id: req.params.anime_id}, 
            {$push: {'animeScores.score_5': user_id}},
            { new: true },
            (err, bangumi) => {
                if (err) {
                    return res.status(500).json({message: err});
                }
                return res.status(200).json({message: 'Succesfully update score of bangumi', data: {bangumi}});
            }
        );
    }
})

module.exports = router;