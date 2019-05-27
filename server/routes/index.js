module.exports = function(app) {
    app.use('/api/auth', require('./auth.js'));
    app.use('/api/user', require('./user.js'));
    app.use('/api/bangumi', require('./bangumi.js'));
}