module.exports = function (app) {

    app.get('/api/ref-data/options/area', function (req, res) {
        var options = ["Fashion", "Music","Lifestyle","Others"];
        res.json(options);
    });

};