var Stats = require('./../../models/user_stats');

module.exports = function (app, passport) {

    app.get('/api/user/stats', passport.authenticate('jwt'), function (req, res) {

        Stats.findOne({ shortid: req.user.shortid }, function (err, stats) {
            if (err) {
                res.status(500).json({ errorMessage: err.message });
            } else {
                if (stats) {
                    res.json(stats)
                } else {
                    res.status(500).json({ errorMessage: 'Could not find stats for this user' });
                }
            }

        });

    });

};