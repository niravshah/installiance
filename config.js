var config = [];

config['dev'] = {
    mongoUrl: 'mongodb://localhost/installiance',
    followed_by_count: 50,
    emails:false
};

config['production'] = {
    mongoUrl: 'mongodb://installiance:installiance6383@ds119568.mlab.com:19568/heroku_9s89sx1b',
    followed_by_count: 50,
    emails:false
};

module.exports = config;