var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];
console.log("ENV:", env);

var mongoose = require('mongoose');
mongoose.plugin(require('./models/plugins/tenant'));
mongoose.connect(config.mongoUrl);

var mongo_express = require('mongo-express/lib/middleware');
app.use('/mongo_express', mongo_express(config.mongo_express_config));

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(path.join(__dirname, 'angular')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var swig = require('swig');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
swig.setDefaults({cache: false});

var logger = require('morgan');
app.use(logger('dev'));

var passport = require('passport');
app.use(passport.initialize());

var initPassport = require('./routes/passport/init');
initPassport(passport);


require('./routes/login')(app);
require('./routes/index')(app,passport);


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

app.listen(14000, function () {
    console.log('AllyX App listening on port 12000!');
});
