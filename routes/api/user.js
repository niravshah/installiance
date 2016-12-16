var generatePassword = require('password-generator');
var User = require('./../../models/user');
var emailer = require('./../../modules/emails/email');

module.exports = function (app, config, bcrypt, salt) {

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
                                            res.json({next:'/login'});
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