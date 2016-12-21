var User = require('./../../models/user');
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

        User.findOne({ shortid: req.params.uid }, function (err, user) {
            if (err) {
                res.status(500).json({ message: "Error finding user to be added to alliance" })
            } else {
                if (user) {
                    Alliance.findOne({ allianceId: req.params.aid }, function (err, alliance) {
                        if (err) {
                            res.status(500).json({ message: "Error finding alliance for adding user" })
                        } else {
                            if (alliance) {
                                alliance.members.push(user._id)
                            } else {
                                res.status(404).json({ message: "Could not find the alliance to add the user" })
                            }
                        }
                    })
                } else {
                    res.status(404).json({ message: "Could not find the user to be added to alliance" })
                }
            }

        });

        console.log("Adding user " + req.params.uid + " to alliance " + req.params.aid);
        res.json({ message: "User Added" });
    })

};