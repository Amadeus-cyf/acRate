const mongoose = require('mongoose');

let date = new Date().toLocaleDateString();

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
    airing_start: {
        type: String,
        default: date,
    }
})

module.exports = mongoose.model('BangumiList', BangumiListSchema);