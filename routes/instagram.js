var ig = require('instagramapi').instagram();

module.exports = function (app) {

    ig.use({ client_id: 'e942353eeb2f4c4eb38d5ce059ee5b35', client_secret: '54fc1a4b2b8e45a6a04016657b03bfa6' });

    var redirect_uri = 'https://allyx.herokuapp.com/welcome';

    app.get('/authorize_user', function (req, res) {
        res.redirect(ig.get_authorization_url(redirect_uri, { scope: ['basic','follower_list'], state: 'a state' }));
    });

    app.get('/welcome', function (req, res) {
        ig.authorize_user(req.query.code, redirect_uri, function (err, result) {
            if (err) {
                console.log(err.body);
                res.send("Didn't work");
            } else {
                console.log('Yay! Access token is ' + result.access_token);
                ig.user_self({ access_token: result.access_token }, function (err, medias, pagination, remaining, limit) {
                    console.log('Error', err);
                    console.log('Medias', medias);
                    console.log(pagination, remaining, limit);
                    res.send(medias);
                });
                ig.user_followers({ access_token: result.access_token }, function (err, users, pagination, remaining, limit) {
                    console.log('Error', err);
                    console.log('Medias', users);
                    console.log(pagination, remaining, limit);
                    res.send(medias);
                });
                ig.user_self_media_recent({ access_token: result.access_token }, function (err, medias, pagination, remaining, limit) {
                    console.log('Error', err);
                    console.log('Medias', medias);
                    console.log(pagination, remaining, limit);
                    res.send(medias);
                });

            }
        });
    });

};