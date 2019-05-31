const mongoose = require('mongoose');

var ReplySchema = new mongoose.Schema({
    // the id of comment (CommentSchema) where all those replies belong to 
    parentComment_id: {
        type: String,
        required: true,
        default: '',
    },
    // the id of comment(CommentSchema or ReplySchema) where the user replies, 
    // if the replied comment is the parent comment, then repliedComment_id is ''
    repliedComment_id: {
        type: String,
        default: '',
    }, 
    // content of comment
    repliedContent: {
        type: String,
        required: true,
        default: '',
    },
    // the username who replies the comment
    username: {
        type: String,
        required: true,
        default: '',
    },
    // the avatar of the user
    avatar: {
        type: String,
        default: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
    },
    // the date where the replies send
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    like: {
        type: Number,
        default: 0,
    },
    dislike: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('Reply', ReplySchema);