var User = require('./../../models/user');
var emailer = require('./../../modules/emails/email');

module.exports = function (app, config) {

    app.post('/api/user/:id/email', function (req, resp) {
        var user = new User({ shortid: req.params.id, email: req.body.email });
        User.findOneAndUpdate({ shortid: req.params.id }, user, { new: true, upsert: true }, function (err, user) {
            if (err) {
                resp.status(500).json({ err: err, user: user });
            } else {
                if (config.emails === true) {
                    emailer.registration(user.email, user.emailVerificationToken);
                }
                resp.json({ err: err, user: user });
            }
        });
    });


};