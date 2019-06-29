var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser');

var app = express();
var allowCrossDomain =  function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
}
app.use(express.static(__dirname + '/public'));
app.use(allowCrossDomain);

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(flash());

require('./models/userSchema');
require('./models/bangumiSchema');
require('./models/bangumiScoreSchema');
require('./models/bangumiListSchema');
require('./models/commentSchema');

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

require('./routes/')(app, router);

require('./connection/connection')();

var port = 4000 || process.env.PORT;
app.listen(port);
console.log('Server running on port ' + port);