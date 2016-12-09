var ig = require('instagramapi').instagram();
var async = require('async');
module.exports = function (app) {

    ig.use({
        client_id: 'e942353eeb2f4c4eb38d5ce059ee5b35',
        client_secret: '54fc1a4b2b8e45a6a04016657b03bfa6'
    });

    var redirect_uri = 'https://allyx.herokuapp.com/welcome';

    app.get('/authorize_user', function (req, res) {
        res.redirect(ig.get_authorization_url(redirect_uri, {
            scope: ['basic', 'follower_list'],
            state: 'a state'
        }));
    });

    app.get('/welcome', function (req, res) {
        ig.authorize_user(req.query.code, redirect_uri, function (err, result) {
            if (err) {
                console.log(err.body);
                res.render('error', {
                    message: "We could not authorize your request with Instagram!",
                    details: err.body
                })
            } else {
                console.log('Yay! Access token is ' + result.access_token);

                async.parallel([
                        function (cb) {
                            ig.user_self({ access_token: result.access_token },
                                function (err, userInfo, pagination, remaining,
                                          limit) {
                                    console.log('Error', err);
                                    console.log('Self', userInfo);
                                    console.log(pagination, remaining, limit);
                                    cb(err, userInfo);
                                });
                        },
                        function (cb) {
                            ig.user_self_media_recent({}, { access_token: result.access_token },
                                function (err, userInfo, pagination, remaining,
                                          limit) {
                                    console.log('Error', err);
                                    console.log('Self', userInfo);
                                    console.log(pagination, remaining, limit);
                                    cb(err, userInfo);
                                });
                        }],
                    function (err, results) {
                        console.log(err, results);

                        if (err) {
                            console.log("Error Loop");
                            res.render('error',
                                {
                                    message: 'There was an error retrieving your details from Instagram',
                                    details: err
                                })

                        }

                        console.log(results.length);

                        if (results.length < 2) {

                            res.render('error',
                                {
                                    message: 'We could not retrieve all your details from Instagram',
                                    details: ''
                                })
                        } else {

                            var follows = result[0].counts.follows;
                            var followed_by = result[0].counts.followed_by;
                            console.log(follows, followed_by);
                            if (followed_by > follows) {
                                console.log("Returning Successful");
                                res.render('successful');
                            } else {
                                console.log("Returning Unsuccessful");
                                res.render('unsuccessful');
                            }

                        }
                    });

            }
        });
    });

};