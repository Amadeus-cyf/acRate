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
        default: '',
    }
})

module.exports = mongoose.model('BangumiList', BangumiListSchema);