const mongoose = require('mongoose');
const express = require('express');
const Bangumi = require('../models/bangumiSchema');
const router = express.Router();

//get all bangumis
router.get('/', (req, res) => {
    Bangumi.find().exec()
    .then(bangumiList => {
        return res.status(200).json({message: 'Successfully find all bangumis', data: {bangumiList}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.get('/:anime_id', (req, res) => {
    Bangumi.findOne({anime_id: req.params.anime_id}).sort({year: -1}).exec()
    .then(bangumi => {
        if (!bangumi) {
            return res.status(404).json({message: 'Bangumi not found', data: {}});
        }
        return res.status(200).json({message: 'Successfully find corresponding bangumi', data: {bangumi}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

router.get('/:year/:season', (req, res) => {
    let year = req.params.year;
    let season = req.params.season;
    if (season !== 'allyear') {
        Bangumi.find({year: year, season: season}).exec()
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    } else {
        Bangumi.find({year: year}).exec()
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    }
})

router.get('/:year/:season/limit', (req, res) => {
    let year = req.params.year;
    let season = req.params.season;
    Bangumi.find({year: year, season: season}).limit(10).exec()
    .then(bangumiList => {
        return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
    }).catch(err => {
        return res.status(500).json({message: err})
    })
})

router.get('/:year/:season/count', (req, res) => {
    let year = req.params.year;
    let season = req.params.season;
    if (season !== 'allyear') {
        Bangumi.find({year: year, season: season}).countDocuments().exec()
        .then(bangumiNumber => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiNumber}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    } else {
        Bangumi.find({year: year}).countDocuments().exec()
        .then(bangumiNumber => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiNumber}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    }
})

router.get('/:year/:season/:page', (req, res) => {
    let year = req.params.year;
    let season = req.params.season;
    let page = req.params.page;
    if (season !== 'allyear') {
        Bangumi.find({year: year, season: season}).skip((page-1)*30).limit(30).exec()
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    } else {
        Bangumi.find({year: year}).skip((page-1)*30).limit(30).exec()
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err});
        })
    }
})

router.post('/:year/:season', (req, res) => {
    let bangumi = new Bangumi(req.body);
    Bangumi.findOne({anime_id: bangumi.anime_id, year: req.params.year, season: req.params.season}, (err, existBangumi) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (existBangumi) {
            existBangumi.image_url = req.body.image_url;
            existBangumi.airing_start = req.body.airing_start;
            existBangumi.synopsis = req.body.synopsis;
            existBangumi.save().then(() => {
                return res.status(200).json({message: 'Bangumi already exists, update bangumi information', data: {existBangumi}})
            }).catch(err => {
                return res.status(500).json({message: err});
            })
        } else {
            bangumi.save()
            .then(() => {
                return res.status(201).json({message: 'Succssfully add bangumi', data: {bangumi}});
            }).catch(err => {
                return res.status(500).json({message: err});
            })
        }
    })
})

router.delete('/:anime_id', (req, res) => {
    Bangumi.findOneAndRemove({anime_id: req.params.anime_id}).exec()
    .then(bangumi => {
        if (!bangumi) {
            return res.status(404).json({message: 'Bangumi not found', data: {bangumi}});
        }
        return res.status(200).json({message:'Successfully delete bangumi', data: {bangumi}});
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

//remove all bangumis of the year and season
router.delete('/removeAll/:year/:season', (req, res) => {
    Bangumi.remove({year: req.params.year, season: req.params.season}).exec()
    .then(bangumiList => {
        return res.status(200).json({message: 'Successfully remove all bangumi of given date', data:{bangumiList}})
    }).catch(err => {
        return res.status(500).json({message: err});
    })
})

module.exports = router;