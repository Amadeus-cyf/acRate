const mongoose = require('mongoose');
const express = require('express');
const BangumiScore = require('../models/bangumiScoreSchema');
const BangumiList = require('../models/bangumiListSchema');
const User = require('../models/userSchema');
const router = express.Router();

mongoose.set('useFindAndModify', false);

// get all bangumi and corresponding score
router.get('/', (req, res) => {
    BangumiScore.find().exec()
    .then(bangumiScores => {
        return res.status(200).json({message: 'Successfully find all scores', data: {bangumiScores}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

// get the score info of an anime by anime_id
router.get('/:anime_id', (req, res) => {
    BangumiScore.findOne({anime_id: req.params.anime_id}).exec()
    .then(bangumiScore => {
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
router.delete('/:anime_id', (req, res) => {
    BangumiScore.findOneAndRemove({anime_id: req.params.anime_id}).exec()
    .then(bangumiScore => {
        if (!bangumiScore) {
            return res.status(404).json({message: 'Bangumi not found', data: {}});
        }
        return res.status(200).json({message: 'Successfully delete all score info of the bangumi', data: {bangumiScore}})
    }).catch(err => {
        return res.status(500).json({message: err})
    })
})

//update score of the anime and also update user score record
router.put('/:anime_id', (req, res) => {
    let score = req.body.score;
    let user_id = req.body.user_id;
    let image_url = req.body.image_url;
    let title = req.body.title;
    let synopsis = req.body.synopsis;
    if (!score || score > 5 || !user_id) {
        return res.status(404).json({message: 'Invalid score or user id'});
    }
    User.findById(user_id).exec()
    .then(user => {
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        // check whether user has scored anime before, if scored, remove it
        for (let i = 0; i < user.scoreAnime.length; i++) {
            if (user.scoreAnime[i].anime_id === req.params.anime_id) {
                user.scoreAnime.splice(i, 1);
                break;
            }
        }
        // push the anime to the scoreAnime array
        let animeObject = {
            anime_id: req.params.anime_id,
            image_url: image_url,
            title: title,
            synopsis: synopsis,
            score: score*2,
        }
        user.scoreAnime.push(animeObject);
        user.save()
        .then().catch(err => {
            return res.status(500).json({message: err});
        })
    }).catch(err => {
        return res.status(500).json({message: err});
    })
    //update bangumiScore
    BangumiScore.findOne({anime_id: req.params.anime_id}).exec()
    .then(bangumiScore => {
        if (!bangumiScore) {
            return res.status(404).json({message: 'Bangumi not found', data:{}})
        }
        let originScore = 0;
        for (var i = 1; i <= 5; i++) {
            if (bangumiScore[i].includes(user_id)) {
                let index = bangumiScore[i].indexOf(user_id);
                bangumiScore[i].splice(index, 1);
                originScore = i;
                break;
            }
        }
        bangumiScore[score].push(user_id);
        if (originScore === 0) {
           bangumiScore.userNumber += 1;
        }
        let totalScore = bangumiScore.totalScore + parseInt(score)*2 - parseInt(originScore)*2;
        bangumiScore.totalScore = totalScore;
        let userNumber = bangumiScore.userNumber;
        bangumiScore.averageScore = (totalScore/userNumber).toFixed(1);
        BangumiList.findOneAndUpdate({anime_id: req.params.anime_id},{$set: {
            score: bangumiScore.averageScore,
            userNumber: bangumiScore.userNumber,
            totalScore: bangumiScore.totalScore,
        }}, {new: true}, (err, bangumi) => {
            if (err) {
                return res.status(500).json({message: err});
            }
            if (!bangumi) {
                return res.status(404).json({message: 'Bangumi not found', data: {}});
            }
        })
        bangumiScore.save()
        .then(() => {
            return res.status(200).json({message: 'Succesfully upload the score', data: {bangumiScore}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

module.exports = router;