var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var generatePassword = require('password-generator');
var jwt = require('jsonwebtoken');

var User = require('./../../models/user');
var emailer = require('./../../modules/emails/email');

module.exports = function (app, config) {

    app.post('/api/user/:id/email', function (req, resp) {
        var password = generatePassword(8);
        console.log("!!!", password);
        var encryptedPassword = bcrypt.hashSync(password, salt);
        var user = new User({
            shortid: req.params.id,
            email: req.body.email,
            password: encryptedPassword
        });
        User.findOneAndUpdate({shortid: req.params.id}, user, {new: true, upsert: true},
                              function (err, user) {
                                  if (err) {
                                      resp.status(500).json({err: err, user: user});
                                  } else {
                                      if (config.emails === true) {
                                          emailer.registration(user.email,
                                                               user.emailVerificationToken,
                                                               password);
                                      }
                                      resp.json({err: err, user: user});
                                  }
                              });
    });

    app.post('/api/user/login', function (req, res) {

        User.findOne({
                         email: req.body.email
                     }, function (err, user) {
            if (err) {
                res.status(403).json({
                                         errorMessage: 'Unexpected Error' + err.message
                                     });
            }
            if (!user) {
                res.status(403).json({
                                         errorMessage: 'Authentication failed. User not found.'
                                     });
            } else if (user) {

                bcrypt.compare(req.body.pass, user.password, function (err, result) {
                    if (err) {
                        res.status(403).json({
                                                 errorMessage: 'Authentication failed. Unable to decrypt.'
                                             });

                    } else {

                        if (result == true) {

                            if (user.resetPassword == true) {
                                var nextLink = '/user/' + user.shortid + '/password/reset';
                                res.json({next:nextLink});

                            } else {

                                delete user.password;
                                var token = jwt.sign(user, 'secret_sauce', {expiresIn: "4h"});
                                res.cookie('jwt', token, {httpOnly: true});
                                res.json({
                                             next: '/home',
                                             success: true,
                                             message: 'Enjoy your token!',
                                             token: token
                                         });
                            }

                        } else {
                            res.status(403).json({
                                                     errorMessage: 'Authentication failed. Wrong password.'
                                                 });

                        }

                    }
                });
            }
        });

    });

    app.post('/api/user/:id/reset', function (req, res) {
        User.findOne({shortid: req.params.id}, function (err, user) {

            if (err) {
                res.status(500).json({err: err});
            } else {
                if (user) {
                    bcrypt.compare(req.body.oldPassword, user.password, function (err, result) {

                        if (err) {
                            res.status(500).json({errorMessage: err});
                        } else {
                            if (result == true) {
                                if (req.body.password == req.body.repeatPassword) {
                                    user.password = bcrypt.hashSync(req.body.password, salt);
                                    user.resetPassword = false;
                                    user.save(function (err, user) {
                                        if (err) {
                                            res.status(500).json({errorMessage: err.message})
                                        } else {
                                            res.json({next:'/home'});
                                        }
                                    });
                                } else {
                                    res.status(400).json({errorMessage: "New Password does not match Repeat New Password"})
                                }

                            } else {
                                res.status(400).json({errorMessage: "Your old Password does not match"})
                            }
                        }
                    });

                } else {
                    res.status(400).json({errorMessage: "No matching user found"})
                }
            }
        });
    });

};