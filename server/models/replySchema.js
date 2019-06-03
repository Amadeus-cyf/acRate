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
    // the username of the user being replied
    // if the replied comment is the parent comment, then repliedUsername is ''
    repliedUsername: {
        type: String,
        default: '',
    },
    //if the replied comment is the parent comment, then repliedAvatar is ''
    repliedAvatar: {
        type: String,
        default: '',
    },
    // the date where the replies send
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    like: {
        type: Array,
        default: [],
    },
    dislike: {
        type: Array,
        default: [],
    }
})

module.exports = mongoose.model('Reply', ReplySchema);