var User = require('./../../models/user');
var emailer = require('./../../modules/email');

module.exports = function (app, config) {

    app.post('/api/user/:id/email', function (req, resp) {
        User.findOneAndUpdate({ shortid: req.params.id }, req.body, { new: true, upsert: true }, function (err, user) {
            if (err) {
                resp.status(500).json({ err: err, user: user });
            } else {
                if (config.emails === true) {
                    emailer.registration(user.email);
                }
                resp.json({ err: err, user: user });
            }
        });
    })

};