const mongoose = require('mongoose');

var BangumiScoreSchema = new mongoose.Schema({
    anime_id: {
        type: String,
        unique: true,
        required: true,
    }, 
    animeScores: {
        type: Object,
        // each score is an array of user id
        default: {
            "score_1": [],
            "score_2": [],
            "score_3": [],
            "score_4": [],
            "score_5": [],
        }
    }
})

module.exports = mongoose.model('BangumiScore', BangumiScoreSchema);