var Alliance = require('./../../models/alliance');
module.exports = function (app) {
    app.get('/alliances/:aid/join/:token', function (req, res) {

        Alliance.findOne({ allianceId: req.params.aid }, function (err, alliance) {

            if (err) {
                console.log(err);
                res.render('error', { message: 'Your request to join this alliance could not be processed' });
            } else {
                if (alliance) {
                    if (alliance.joinToken == req.params.token) {
                        res.render('alliances/join',{allianceName:alliance.name,state:alliance.allianceId});
                    } else {
                        console.log('Tokens did not match');
                        res.render('error', { message: 'Your request to join this alliance could not be processed' });
                    }
                } else {
                    console.log('Alliance not found');
                    res.render('error', { message: 'Your request to join this alliance could not be processed' });
                }
            }

        });

    });
};