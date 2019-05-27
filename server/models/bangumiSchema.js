const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var BangumiSchema = new mongoose.Schema({
    anime_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        default: '',
    },
    image_url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    synopsis: {
        type: String,
        default: '(No synopsis yet.)'
    },
    type: {
        type: String,
        default: '',
    },
    airing_start: {
        type: String,
        default: '',
    },
    episodes: {
        type: Number,
        default: null,
    },
    genres: {
        type: Array,
        default: [],
    },
    source: {
        type: String,
        default: '',
    },
    producers: {
        type: Array,
        default: [],
    },
    licensors: {
        type: Array,
        default: [],
    },
    continuing: {
        type: Boolean,
        default: false,
    },
    year: {
        type: String,
        default: '',
    },
    season: {
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('Bangumi', BangumiSchema);
