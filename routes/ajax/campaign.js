var Campaign = require('./../../models/campaign');
var User = require('./../../models/user');
var shortid = require('shortid');
var mongoose = require('mongoose');

module.exports = function (app, passport) {

    app.post('/api/campaigns/new', passport.authenticate('jwt'), function (req, res) {
        var campaign = req.body;
        campaign.shortid = req.user.shortid;
        campaign.campaignId = shortid.generate();
        campaign.joinToken = shortid.generate();
        new Campaign(campaign).save(function (err, campaign) {
            if (err) {
                console.log('Error', err);
                res.status(500).json({ error: err })
            } else {
                res.json({ campaign: campaign })
            }
        });
    });

    app.get('/api/campaigns/:id', passport.authenticate('jwt'), function (req, res) {

        Campaign.findOne({ campaignId: req.params.id }, function (err, campaign) {
            if (err) {
                console.log('Error', err);
                res.status(500).json({ error: err })
            } else {
                if (campaign) {
                    res.json(campaign);
                } else {
                    res.status(400).json({ error: 'Could not find the alliance' })
                }
            }
        })

    });

    app.post('/api/campaigns/:id/status/:status', passport.authenticate('jwt'), function (req, res) {

        Campaign.findOneAndUpdate({ campaignId: req.params.id }, { status: req.params.status }, {
            new: true,
            upsert: false
        }, function (err, campaign) {
            if (err) {
                console.log('Error', err);
                res.status(500).json({ error: err })
            } else {
                if (campaign) {
                    res.json(campaign);
                } else {
                    res.status(400).json({ error: 'Could not find the alliance' })
                }
            }
        })

    });

    app.post('/api/campaigns/:id/join/:uid', passport.authenticate('jwt'), function (req, res) {

        User.findOne({ shortid: req.params.uid }, function (err, user) {
            if (err) {
                res.status(500).json({ error: err })
            } else {
                if (user) {
                    Campaign.findOne({ campaignId: req.params.id }, function (err, campaign) {
                        if (err) {
                            res.status(500).json({ error: err })
                        } else {
                            if (campaign) {
                                campaign.participants.push(new mongoose.Types.ObjectId(user._id));
                                campaign.save(function (err) {
                                    res.json(campaign);
                                })
                            } else {
                                res.status(400).json({ error: 'Could not find the campaign' })
                            }
                        }
                    })
                } else {
                    res.status(400).json({ error: 'Could not find the user' })
                }
            }
        });

    });
};
