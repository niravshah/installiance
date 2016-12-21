var Campaign = require('./../../models/campaign');
var shortid = require('shortid');

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
};