var _ = require('lodash');
var async = require('async');
var ig = require('instagramapi').instagram();
var mocks = require('./../../mocks');
var Stats = require('./../../models/user_stats');
var shortid = require('shortid');

module.exports = function (app, config) {

    ig.use({
        client_id: 'e942353eeb2f4c4eb38d5ce059ee5b35',
        client_secret: '54fc1a4b2b8e45a6a04016657b03bfa6'
    });

    var redirect_uri = 'http://influenceally.com/welcome';

    app.get('/authorize_user/:state', function (req, res) {
        res.redirect(ig.get_authorization_url(redirect_uri, {
            scope: ['basic', 'follower_list'],
            state: req.params.state
        }));
    });

    app.get('/welcome', function (req, res) {
        ig.authorize_user(req.query.code, redirect_uri, function (err, result) {
            if (err) {
                console.log(err);
                res.render('error', {
                    message: "We could not authorize your request with Instagram.",
                    details: err.body
                })
            } else {
                //console.log('Yay! Access token is ' + result.access_token);
                async.parallel([
                        function (cb) {
                            ig.user_self({ access_token: result.access_token },
                                function (err, userInfo, pagination, remaining,
                                          limit) {
                                    console.log('Error', err);
                                    //console.log('Self', userInfo);
                                    //console.log(pagination, remaining, limit);
                                    cb(err, userInfo);
                                });
                        },
                        function (cb) {
                            ig.user_self_media_recent({},
                                { access_token: result.access_token },
                                function (err, userInfo,
                                          pagination, remaining,
                                          limit) {
                                    console.log('Error', err);
                                    //console.log('Self',
                                    // userInfo);
                                    // console.log(pagination,
                                    // remaining, limit);
                                    cb(err, userInfo);
                                });
                        }],
                    function (err, results) {
                        if (err) {
                            console.log("Error Loop");
                            res.render('error',
                                {
                                    message: 'There was an error retrieving your details from Instagram',
                                    details: err
                                })
                        }
                        if (results.length < 2) {
                            res.render('error',
                                {
                                    message: 'We could not retrieve all your details from Instagram',
                                    details: ''
                                })
                        } else {
                            isUserInfluencer(results, function (result, media) {
                                isUserInfluencerCb(res, result, media, req.query.state)
                            });
                        }
                    });
            }
        });
    });

    app.get('/mocktest', function (req, res) {
        var results = mocks;
        isUserInfluencer(results, function (result, media) {
            isUserInfluencerCb(res, result, media)
        });
    });

    function isUserInfluencer(results, cb) {
        var follows = results[0].counts.follows;
        var followed_by = results[0].counts.followed_by;
        if (followed_by > follows && followed_by > config.followed_by_count) {

            var likes =
                _.chain(results[1])
                    .orderBy(['likes.count', 'comments.count'], ['desc', 'desc'])
                    .map(function (value) {
                        var newMedia = {};
                        newMedia.img = value.images.low_resolution.url;
                        newMedia.likes = value.likes.count;
                        newMedia.tags = value.tags;
                        newMedia.comments = value.comments.count;
                        return newMedia
                    })
                    .value();

            var all_tags = _.chain(likes)
                .filter(function (val) {
                    return val.tags.length > 0;
                })
                .flatMap('tags')
                .value();

            var tag_freq = {};

            _.each(all_tags, function (tag) {
                if (tag_freq[tag]) {
                    tag_freq[tag]++
                } else {
                    tag_freq[tag] = 1
                }
            });

            saveUserStats(results[0], all_tags, tag_freq, likes, function (err, res) {
                if (err) {
                    cb(false, null);
                } else {
                    cb(true, res);
                }
            });
        } else {
            cb(false, null);
        }
    }

    function saveUserStats(userinfo, all_tags, tag_freq, likes, cb) {

        new Stats({
            shortid: shortid.generate(),
            instagram_id: userinfo.id,
            full_name: userinfo.full_name,
            profile_picture: userinfo.profile_picture,
            counts: userinfo.counts,
            timestamp: new Date(),
            all_tags: all_tags,
            tag_freq: tag_freq,
            likes: likes
        }).save(function (err, stats) {
            if (err) {
                console.log('Error', err);
                cb(err, null)
            } else {
                console.log('User Stats Saved!');
                cb(null, stats)
            }
        });
    }

    function isUserInfluencerCb(res, result, media, state) {
        console.log("!!! isUserInfluencerCb", state);
        if (result === true) {
            console.log("Returning Successful");
            res.render('instagram/successful', { medias: media, state: state });
        } else {
            console.log("Returning Unsuccessful");
            res.render('instagram/unsuccessful');
        }
    }

};