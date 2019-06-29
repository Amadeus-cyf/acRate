module.exports = function(app) {
    app.use('/api/auth', require('./auth.js'));
    app.use('/api/user', require('./user.js'));
    app.use('/api/avatar', require('./avatar.js'));
    app.use('/api/background', require('./background.js'));
    app.use('/api/bangumi', require('./bangumi.js'));
    app.use('/api/bangumiScore', require('./bangumiScore.js'));
    app.use('/api/bangumiList', require('./bangumiList.js'));
    app.use('/api/comment', require('./comment.js'));
}