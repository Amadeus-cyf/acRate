var express = require('express'),
    mongoose = require('mongoose'),
    secrets = require('../config/secrets');

//Connect to Mongodb
module.exports = function() {
    mongoose.connect(secrets.mongo_connection, {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.once('open', function connect() {
        console.log('Connect to Mongodb');
    });
}
