var User = require('./../../models/user');

module.exports = function (app) {

    app.get('/user/email/verify/:token', function (req, res) {
        User.findOneAndUpdate({ emailVerificationToken: req.params.token }, {
            emailNeedsVerification: false,
            emailVerificationToken: null
        }, function (err, user) {

            if (err) {
                res.render('error', { message: 'Could not verify Email', details: err.body })
            } else {

                if (user) {
                    res.render('emails/verified');
                } else {
                    res.render('error', { message: 'Could not verify Email', details: 'Invalid Token' })
                }

            }

        });
    });

};