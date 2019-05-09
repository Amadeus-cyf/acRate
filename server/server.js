var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const path = require('path');

var app = express();
//solve cross domain issue
var allowCrossDomain =  function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
}

app.use(express.static(__dirname + '/public'));
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

require('./routes/')(app);
require('./connection/connection.js')();


var port = 4000;
app.listen(port);
console.log('Server running on port' + port);
