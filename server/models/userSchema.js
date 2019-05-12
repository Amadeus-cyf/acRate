const mongoose = require('mongoose');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    //use salt and hash to store password
    salt:{
        type: String,
    },
    hash: {
        type: String,
    },
    //commentAnime is an array of object, each object contains comment and anime;
    commentAnime: {
        type: Array,
        default: [],
    },
    //score anime is an array of object, each object contains anime and score;
    scoreAnime: {
        type: Array,
        default: [],
    },
    avatar: {
        type: String,
        default: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
    },
    background: {
        type: String,
        default: 'https://mmbiz.qpic.cn/mmbiz_jpg/S7nm1Rly3ZKFTSy6fWBeg5wH9sXqGkTfiaZ2aTQ8EKvrzn2xvcSSI7tbqbcn5HgMicrkqC7EIFBVqO1FjhRw795Q/640?wx_fmt=jpeg',
    }
})

//set password for user
UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

//check whether the password for login is correct
UserSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return hash === this.hash;
}

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
