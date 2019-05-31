const mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    anime_id: {
        type: String,
        required: true,
        default: '',
    },
    // the content of comment
    commentContent: {
        type: String, 
        required: true,
        default: '',
    },
    // the username of the user who comments
    username: {
        type: String,
        required: true,
        default: '',
    }, 
    // the avatar of the user
    avatar: {
        type: String,
        required: true,
        default: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
    },
    // date comments
    date: {
        type: Date,
        default: new Date(),
    },
    like: {
        type: Number,
        default: 0,
    },
    dislike: {
        type: Number, 
        default: 0,
    },
})

module.exports = mongoose.model('Comment', CommentSchema);