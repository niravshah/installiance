var Alliance = require('./../../models/alliance');
var shortid = require('shortid');

module.exports = function (app, passport) {

    app.post('/api/alliances/new', passport.authenticate('jwt'), function (req, res) {

        var alliance = req.body;
        alliance.shortid = req.user.shortid;
        alliance.allianceId = shortid.generate();
        alliance.joinToken = shortid.generate();
        new Alliance(alliance).save(function (err, alliance) {
            if (err) {
                console.log('Error', err);
                res.status(500).json({ error: err })
            } else {
                res.json({ alliance: alliance })
            }
        });

    });

    app.get('/api/alliances/:id', passport.authenticate('jwt'), function (req, res) {

        Alliance.findOne({ allianceId: req.params.id }, function (err, alliance) {
            if (err) {
                console.log('Error', err);
                res.status(500).json({ error: err })
            } else {
                if (alliance) {
                    res.json(alliance);
                } else {
                    res.status(400).json({ error: 'Could not find the alliance' })
                }
            }
        })

    });

    app.post('/api/alliances/:aid/allies/add/:uid', function (req, res) {
        console.log("Adding user " + req.params.uid + " to alliance " + req.params.aid);
        res.json({ message: "User Added" });
    })

};