var config = [];

config['dev'] = {
    mongoUrl: 'mongodb://localhost/engageapp',
    followed_by_count: 100
};

config['production'] = {
    mongoUrl: 'mongodb://installiance:installiance6383@ds119568.mlab.com:19568/heroku_9s89sx1b',
    followed_by_count: 5000
};

module.exports = config;