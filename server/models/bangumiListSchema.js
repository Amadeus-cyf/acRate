const mongoose = require('mongoose');

var BangumiListSchema = new mongoose.Schema({
    anime_id: {
        type: String,
        required: true,
        unique: true,
        default: '',
    },
    title: {
        type: String,
        required: true,
        text: true,
        default: '',
    },
    image_url: {
        type: String,
        required: true,
        default: '',
    },
    synopsis: {
        type: String,
        default: '(No synopsis yet.)'
    },
    airing_start: {
        type: String,
        default: '',
    },
    score: {
        type: Number,
        default: 0.0,
    },
    userNumber: {
        type: Number, 
        default: 0,
    },
    totalScore: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('BangumiList', BangumiListSchema);