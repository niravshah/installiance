var config = [];

config['dev'] = {
    mongoUrl: 'mongodb://localhost/engageapp'
};

config['production'] = {
    mongoUrl: 'mongodb://installiance:installiance6383@ds119568.mlab.com:19568/heroku_9s89sx1b'
};

module.exports = config;