var bcrypt = require('bcryptjs');
var generatePassword = require('password-generator');
var jwt = require('jsonwebtoken');

var User = require('./../../models/user');
var emailer = require('./../../modules/emails/email');

module.exports = function (app, config) {

    app.post('/api/user/:id/email', function (req, resp) {
        var password = generatePassword(8);
        var encryptedPassword = bcrypt.hashSync(password, 10);
        var user = new User({ shortid: req.params.id, email: req.body.email, password: encryptedPassword });
        User.findOneAndUpdate({ shortid: req.params.id }, user, { new: true, upsert: true }, function (err, user) {
            if (err) {
                resp.status(500).json({ err: err, user: user });
            } else {
                if (config.emails === true) {
                    emailer.registration(user.email, user.emailVerificationToken, password);
                }
                resp.json({ err: err, user: user });
            }
        });
    });

    app.post('/api/user/:id/login', function (req, res) {

        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Unexpected Error' + err.message
                });
            }
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {

                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. Unable to decrypt.'
                        });

                    } else {

                        if (result == true) {

                            if (user.resetPassword == true) {

                                res.redirect('/user/'+ req.params.id +'/password/reset')

                            } else {

                                delete user.password;
                                var token = jwt.sign(user, 'secret_sauce', { expiresIn: "4h" });
                                res.cookie('jwt', token, { httpOnly: true });
                                res.json({
                                    success: true,
                                    message: 'Enjoy your token!',
                                    token: token
                                });
                            }

                        } else {
                            res.json({
                                success: false,
                                message: 'Authentication failed. Wrong password.'
                            });

                        }

                    }
                });
            }
        });

    });

    app.post('/api/user/:id/reset', function (req, res) {
        User.findOne({_id: req.params.id}, function (err, user) {

            if (err) {
                res.status(500).json({success: false, err: err});
            } else {
                if (user) {
                    bcrypt.compare(req.body.eP, user.password, function (err, result) {

                        if (err) {
                            res.status(500).json({success: false, err: err});
                        } else {
                            if (result == true) {
                                if (req.body.nP == req.body.rNP) {
                                    user.password = bcrypt.hashSync(req.body.nP, salt);
                                    user.resetPassword = false;
                                    user.save(function (err, user) {
                                        if (err) {
                                            res.json({success: false, reason: err.message})
                                        } else {
                                            res.json({success: true});
                                        }
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        reason: "New Password does not match Repeat New Password"
                                    })
                                }

                            } else {
                                res.json({success: false, reason: "Password does not match"})
                            }
                        }
                    });

                } else {
                    res.json({success: false, reason: "No matching user found"})
                }
            }
        });
    });

};