const mongoose = require('mongoose');
const express = require('express');
const BangumiList = require('../models/bangumiListSchema');
const router = express.Router();

router.get('/', (req, res) => {
    BangumiList.find().exec()
    .then(bangumiList => {
        return res.status(200).json({message: "Successfully find all bangumis", data: {bangumiList}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.get('/count', (req, res) => {
    BangumiList.find().countDocuments().exec()
    .then(bangumiNumber => {
        return res.status(200).json({message: 'Succesfully find the number of bangumis', data: {bangumiNumber}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.get('/:page', (req, res) => {
    let page = req.params.page;
    BangumiList.find().skip((page-1)*24).limit(24).exec()
    .then(bangumiList => {
        return res.status(200).json({message: 'Succesfully find bangumis of the page', data: {bangumiList}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.get('/:anime_id', (req, res) => {
    BangumiList.findOne({anime_id: req.params.anime_id}).exec()
    .then(bangumi => {
        if (!bangumi) {
            return res.status(404).json({message: 'Bangumi not found', data: {}});
        }
        return res.status(200).json({message: 'Succesfully find the bangumi', data: {bangumi}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.get('/filter/:keyword', (req, res) => {
    BangumiList.find({title: {$gte: req.params.keyword, $lte: req.params.keyword + 'z'}}).exec()
    .then(bangumiList => {
        return res.status(200).json({message: 'Succesfully find the filtered bangumi list', data: {bangumiList}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.get('/search/:keyword', (req, res) => {
    let keyword = '\"' + req.params.keyword + '\"'
    BangumiList.find({$text : {$search: keyword}}).exec()
    .then(bangumiList => {
        if (bangumiList.length === 0) {
            BangumiList.find({$text: {$search: req.params.keyword}}).exec()
            .then(bangumiList => {
                return res.status(200).json({message: 'Successfully find all matched bangumis', data: {bangumiList}});
            }).catch(err => {
                return res.status(500).json({message: err});
            })
        } else {
            return res.status(200).json({message: 'Successfully find all matched bangumis', data: {bangumiList}});
        }
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.post('/', (req, res) => {
    bangumiList = new BangumiList(req.body);
    let anime_id = req.body.anime_id;
    BangumiList.findOne({anime_id: anime_id}, (err, bangumi) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (bangumi) {
            return res.json({message: 'Bangumi already exists'});
        }
        bangumiList.save()
        .then(() => {
            return res.status(201).json({message: 'Successfully upload the bangumi', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    })
})

router.delete('/:anime_id', (req, res) => {
    BangumiList.findOneAndRemove({anime_id: req.params.anime_id}, (err, bangumiList) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (!bangumiList) {
            return res.status(404).json({message: 'Bangumi not found', data: {}});
        }
        return res.status(200).json({message: 'Successfully delete the bangumi', data: {bangumiList}});
    }) 
})

module.exports = router;