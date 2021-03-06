var generatePassword = require('password-generator');
var User = require('./../../models/user');
var UserStats = require('./../../models/user_stats');
var Alliance = require('./../../models/alliance');
var Campaign = require('./../../models/campaign');
var emailer = require('./../../modules/emails/email');

module.exports = function (app, config, bcrypt, salt, passport) {

    app.post('/api/user/:id/email', function (req, resp) {

        UserStats.findOne({}, function (err, stats) {

            if(err){

                res.status(500).json({err: err});
            }else{
                if(stats){
                    var password = generatePassword(8);
                    console.log("!!!", password);
                    var encryptedPassword = bcrypt.hashSync(password, salt);
                    var user = new User({
                        shortid: req.params.id,
                        email: req.body.email,
                        password: encryptedPassword,
                        stats: stats._id,
                        instagram_id: stats.instagram_id,
                        full_name: stats.full_name,
                        profile_picture: stats.profile_picture,
                        counts: stats.counts
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

                }else{
                    res.status(404).json({errorMessage: "Could not find the Instagram Stats for this user"});
                }
            }
        })
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
                                            res.json({next: '/login'});
                                        }
                                    });
                                } else {
                                    res.status(400).json(
                                        {errorMessage: "New Password does not match Repeat New Password"})
                                }

                            } else {
                                res.status(400)
                                    .json({errorMessage: "Your old Password does not match"})
                            }
                        }
                    });

                } else {
                    res.status(400).json({errorMessage: "No matching user found"})
                }
            }
        });
    });

    app.get('/api/user/:uid/alliances', passport.authenticate('jwt'), function (req, res) {

        Alliance.find({shortid: req.params.uid}, function (err, alliances) {
            if (err) {
                console.log('Error', err);
                res.status(500).json({error: err})
            } else {
                if (alliances) {
                    res.json(alliances);
                } else {
                    res.status(400).json({error: 'Could not find the alliance'})
                }
            }
        })

    });

    app.get('/api/user/:uid/campaigns', passport.authenticate('jwt'), function (req, res) {

        User.findOne({shortid: req.params.uid}, function (err, user) {

            if (err) {
                res.status(500).json({error: err})
            } else {
                if (user) {
                    if (user.type == 'brand') {
                        Campaign.find({shortid: req.params.uid}, function (err, alliances) {
                            if (err) {
                                console.log('Error', err);
                                res.status(500).json({error: err})
                            } else {
                                if (alliances) {
                                    res.json(alliances);
                                } else {
                                    res.status(400).json({error: 'Could not find the alliance'})
                                }
                            }
                        });
                    } else {


                        //get all of the users alliances - member or creator.
                        //get all campaigns with that alliance as participant.
                        //for now we will send out all the campaigns.

                        Campaign.find({}, function (err, alliances) {
                            if (err) {
                                console.log('Error', err);
                                res.status(500).json({error: err})
                            } else {
                                if (alliances) {
                                    res.json(alliances);
                                } else {
                                    res.status(400).json({error: 'Could not find the alliance'})
                                }
                            }
                        });

                    }

                } else {
                    res.status(400).json({error: 'Could not find the user'})
                }
            }

        });

    });

};