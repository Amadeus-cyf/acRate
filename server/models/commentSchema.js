const mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    anime_id: {
        type: String,
        required: true,
        default: '',
    },
    // the id of comment (CommentSchema) where all those replies belong to 
    // if the comment is the parent comment, than parentComment id is 'none'
    parentComment_id: {
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
     // the id of comment(CommentSchema or ReplySchema) where the user replies, 
    // if the comment is not a reply, the replied comment id is 'none'
    // if the replied comment id is parent comment, then replied comment id = parent comment id
    repliedComment_id: {
        type: String,
        required: true,
        default: '',
    }, 
     // the username of the user being replied
    // if the comment is not a reply, the replied username is 'none'
    repliedUsername: {
        type: String,
        required: true,
        default: '',
    },
    //if the replied comment is the parent comment or the comment is not a reply, then repliedAvatar is 'none'
    repliedAvatar: {
        type: String,
        required: true,
        default: '',
    },
    // date comments
    date: {
        type: Date,
        default: new Date(),
    },
    like: {
        type: Array,
        default: [],
    },
    dislike: {
        type: Array, 
        default: [],
    },
})

module.exports = mongoose.model('Comment', CommentSchema);