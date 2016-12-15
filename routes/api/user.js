var Stats = require('./../../models/user_stats');
var User = require('./../../models/user');

module.exports = function (app) {

    app.post('/api/user/:id/email', function (req, resp) {

        User.findOneAndUpdate({ shortid: req.params.id }, req.body, { new: true, upsert: true }, function (err, user) {
            if(err){
                resp.status(500).json({ err: err, user: user });
            }else{
                resp.json({ err: err, user: user });
            }

        });
    })

};