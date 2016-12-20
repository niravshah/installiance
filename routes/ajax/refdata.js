module.exports = function (app) {

    app.get('/api/ref-data/options/areas', function (req, res) {
        var options = ["Fashion", "Music","Lifestyle","Others"];
        res.json(options);
    });

    app.get('/api/ref-data/options/tags', function (req, res) {
        var options = ["Fashion", "Music","Lifestyle","Others"];
        res.json(options);
    });

};