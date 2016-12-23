var Campaign = require('./../../models/campaign');
var Alliance = require('./../../models/alliance');
var shortid = require('shortid');

module.exports = function (app, passport) {

    app.post('/api/campaigns/new', passport.authenticate('jwt'), function (req, res) {
        var campaign = req.body;
        campaign.shortid = req.user.shortid;
        campaign.campaignId = shortid.generate();
        campaign.joinToken = shortid.generate();
        campaign.participants = [];
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

        Campaign.findOne({ campaignId: req.params.id }).populate('participants').exec(function (err, campaign) {
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

        Alliance.findOne({ allianceId: req.params.uid }, function (err, alliance) {
            if (err) {
                res.status(500).json({ error: err })
            } else {
                if (alliance) {
                    if (err) {
                        res.status(500).json({ error: err })
                    } else {
                        Campaign.update({ campaignId: req.params.id }, { $push: { participants: alliance._id } }, {}, function (err, numAffected) {
                            if (err) {
                                console.log('Error', err);
                                res.status(500).json(err);
                            } else {
                                if (numAffected.n > 0) {
                                    Campaign.findOne({ campaignId: req.params.id }).populate('participants').exec(function (err, campaign) {
                                        if (err) {
                                            res.status(500).json({ error: err })
                                        } else {
                                            res.json(campaign);
                                        }
                                    });
                                } else {
                                    res.status(400).json({ error: 'Could not find the campaign' })
                                }
                            }
                        });
                    }

                } else {
                    res.status(400).json({ error: 'Could not find the alliance' })
                }
            }
        });

    });
    
    app.get('/api/campaign/:id/tags/:tag',function(req,resp){
        
    });
};
