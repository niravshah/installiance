var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];
console.log("ENV:", env);

var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);

//var mongo_express = require('mongo-express/lib/middleware');
//app.use('/mongo_express', mongo_express(config.mongo_express_config));

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts/', express.static(__dirname + '/node_modules/'));
app.use('/bower/', express.static(__dirname + '/bower_components/'));

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var swig = require('swig');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
swig.setDefaults({ cache: false });

var logger = require('morgan');
app.use(logger('dev'));

var passport = require('passport');
app.use(passport.initialize());

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var ig = require('instagramapi').instagram();
ig.use({client_id: 'e942353eeb2f4c4eb38d5ce059ee5b35', client_secret: '54fc1a4b2b8e45a6a04016657b03bfa6'});


require('./routes/passport/init')(passport);

require('./routes/mvc/instagram')(app, config, ig);
require('./routes/mvc/login')(app, bcrypt, salt);
require('./routes/mvc/user')(app);
require('./routes/mvc/home')(app, passport);
require('./routes/mvc/alliance')(app);

require('./routes/ajax/refdata')(app);
require('./routes/ajax/user')(app, config, bcrypt, salt,passport);
require('./routes/ajax/stats')(app, passport);
require('./routes/ajax/alliance')(app, passport);
require('./routes/ajax/campaign')(app, passport,ig, config);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('The requested URL ' + req.url + ' not found');
    err.status = 404;
    next(err);
});

if (env === 'dev') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: "Error Response",
            errorMessage: err.message,
            error: err
        });
    });
} else {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: "Error Response",
            errorMessage: err.message
        });
    });
}

app.set('port', (process.env.PORT || 12000));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});