module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/login', function (req, res) {
        res.render('login/login');
    });

    app.get('/user/:id/password/reset', function (req, res) {
        res.render('login/reset',{shortid: req.params.id});
    })
};