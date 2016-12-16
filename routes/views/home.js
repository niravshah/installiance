module.exports = function (app, passport) {
    app.get('/home', passport.authenticate('jwt', {failureRedirect: '/login'}), function (req, res) {
        res.render('home');
    });
};