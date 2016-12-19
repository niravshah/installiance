var jwt = require('jsonwebtoken');
var User = require('./../../models/user');

module.exports = function (app, bcrypt) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/login', function (req, res) {
        res.render('login/login');
    });

    app.post('/login', function (req, res) {

        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(403).render('login/login', {
                    errorMessage: 'Unexpected Error' + err.message
                });
            }
            if (!user) {
                res.status(403).render('login/login', {
                    errorMessage: 'Authentication failed. User not found.'
                });
            } else if (user) {

                bcrypt.compare(req.body.pass, user.password, function (err, result) {
                    if (err) {
                        res.status(403).render('login/login', {
                            errorMessage: 'Authentication failed. Unable to decrypt.'
                        });

                    } else {

                        if (result == true) {
                            if (user.resetPassword == true) {
                                res.render('login/reset', { shortid: user.shortid })
                            } else {
                                delete user.password;
                                var token = jwt.sign(user, 'secret_sauce', { expiresIn: "4h" });
                                res.cookie('jwt', token, { httpOnly: true });
                                res.redirect('/home');
                            }

                        } else {
                            res.status(403).render('login/login', {
                                errorMessage: 'Authentication failed. Wrong password.'
                            });

                        }

                    }
                });
            }
        });

    });

    app.get('/home', function(req,res){
        res.render('home');
    })

};