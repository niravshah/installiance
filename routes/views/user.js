var User = require('./../../models/user');

module.exports = function (app) {

    app.get('/user/email/verify/:token', function (req, res) {

        User.findOneAndUpdate({ emailVerificationToken: req.params.token }, { emailNeedsVerification: false,emailVerificationToken:null }, function (err, user) {

            if (err) {

            } else {
                res.render('emails/verified');
            }

        });

    })

};