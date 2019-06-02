const mongoose = require('mongoose');

var BangumiScoreSchema = new mongoose.Schema({
    anime_id: {
        type: String,
        unique: true,
        required: true,
    }, 
    //scores
    1: {
        type: Array,
        default: [],
    },
    2: {
        type: Array,
        default: [],
    },
    3: {
        type: Array,
        default: [],
    },
    4: {
        type: Array,
        default: [],
    },
    5: {
        type: Array,
        default: [],
    },
    averageScore: {
        type: Number,
        default: 0.0,
    },
    userNumber: {
        type: Number,
        default: 0,
    },
    // sum of score for all users
    totalScore: {
        type: Number,
        default: 0.0,
    }
})

module.exports = mongoose.model('BangumiScore', BangumiScoreSchema);