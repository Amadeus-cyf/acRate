const mongoose = require('mongoose');
const express = require('express');
const Bangumi = require('../models/bangumiSchema');
const router = express.Router();

//get all bangumis
router.get('/', (req, res) => {
    Bangumi.find()
    .then(bangumiList => {
        return res.status(200).json({message: 'Successfully find all bangumis', data: {bangumiList}});
    }).catch(err => {
        return res.status(500).json({message: err})
    })
})

router.get('/:year/:season', (req, res) => {
    let year = req.params.year;
    let season = req.params.season;
    if (season !== 'allyear') {
        Bangumi.find().where({year: year, season: season})
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err})
        })
    } else {
        Bangumi.find().where({year: year})
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err})
        })
    }
})

router.get('/:year/:season/limit', (req, res) => {
    let year = req.params.year;
    let season = req.params.season;
    if (season !== 'allyear') {
        Bangumi.find().where({year: year, season: season}).limit(18)
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err})
        })
    } else {
        Bangumi.find().where({year: year}).limit(18)
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err})
        })
    }
})

router.get('/:year/:season/count', (req, res) => {
    let year = req.params.year;
    let season = req.params.season;
    if (season !== 'allyear') {
        Bangumi.find().where({year: year, season: season}).count()
        .then(bangumiNumber => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiNumber}});
        }).catch(err => {
            return res.status(500).json({message: err})
        })
    } else {
        Bangumi.find().where({year: year}).count()
        .then(bangumiNumber => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiNumber}});
        }).catch(err => {
            return res.status(500).json({message: err})
        })
    }
})


router.get('/:year/:season/:page', (req, res) => {
    let year = req.params.year;
    let season = req.params.season;
    let page = req.params.page;
    if (season !== 'allyear') {
        Bangumi.find().where({year: year, season: season}).skip((page-1)*36).limit(36)
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err})
        })
    } else {
        Bangumi.find().where({year: year}).skip((page-1)*36).limit(36)
        .then(bangumiList => {
            return res.status(200).json({message: 'Succesfully find all bangumi of corresponding time', data: {bangumiList}});
        }).catch(err => {
            return res.status(500).json({message: err})
        })
    }
})

router.post('/', (req, res) => {
    let bangumi = new Bangumi(req.body);
    bangumi.save()
    .then(() => {
        return res.status(201).json({message: 'Succssfully add bangumi', data: {bangumi}})
    }).catch(err => {
        console.log(err)
    })

})

router.delete('/:id', (req, res) => {
    Bangumi.findOneAndRemove(req.params.id)
    .then(bangumi => {
        if (!bangumi) {
            return res.status(404).json({message: 'Could not find bangumi', data: {bangumi}})
        }
        return res.status(200).json({message:'Successfully delete bangumi', data: {bangumi}})
    }).catch(err => {
        return res.status(500).json({message: err})
    })
})

module.exports = router;