var config = [];

config['dev'] = {
    fileStorage:'local',
    mongoUrl: 'mongodb://localhost/engageapp',
    mongo_express_config: {
        mongodb: {
            server: "localhost",
            port: 27017,
            ssl: false,
            sslValidate: true,
            sslCA: [],
            autoReconnect: true,
            poolSize: 4,
            admin: false,
            auth: [
                {
                    database: 'engageapp',
                    username: '',
                    password: ''
                }

            ],
            adminUsername: '',
            adminPassword: '',
            whitelist: [],
            blacklist: []
        },
        site: {
            baseUrl: '/',
            cookieKeyName: 'mongo-express',
            cookieSecret: 'cookiesecret',
            host: 'localhost',
            port:  8081,
            requestSizeLimit:  '50mb',
            sessionSecret: 'sessionsecret',
            sslCert: '',
            sslEnabled:  false,
            sslKey: '',
        },
        useBasicAuth: true,
        basicAuth: {
            username: 'engageapp',
            password: 'engageapp'
        },
        options: {
            console: true,
            documentsPerPage: 10,
            editorTheme: 'rubyblue',
            maxPropSize: (100 * 1000),  // default 100KB
            maxRowSize: (1000 * 1000),  // default 1MB
            cmdType: 'eval',
            subprocessTimeout: 300,
            readOnly: false,
            collapsibleJSON: true,
            collapsibleJSONDefaultUnfold: 1
        },
        defaultKeyNames: {}
    }
};

config['live'] = {
    fileStorage:'s3',
    mongoUrl: 'mongodb://engageapp:AppEngage0816@localhost/engageapp',
    mongo_express_config: {
        mongodb: {
            server: "localhost",
            port: 27017,
            ssl: false,
            sslValidate: true,
            sslCA: [],
            autoReconnect: true,
            poolSize: 4,
            admin: false,
            auth: [
                {
                    database: 'engageapp',
                    username: 'engageapp',
                    password: 'AppEngage0816'
                },
            ],
            adminUsername: '',
            adminPassword: '',
            whitelist: [],
            blacklist: []
        },
        site: {
            baseUrl: '/',
            cookieKeyName: 'mongo-express',
            cookieSecret: 'cookiesecret',
            host: 'localhost',
            port:  8081,
            requestSizeLimit:  '50mb',
            sessionSecret: 'sessionsecret',
            sslCert: '',
            sslEnabled:  false,
            sslKey: '',
        },
        useBasicAuth: true,
        basicAuth: {
            username: 'engageapp',
            password: 'engageapp'
        },
        options: {
            console: true,
            documentsPerPage: 10,
            editorTheme: 'rubyblue',
            maxPropSize: (100 * 1000),  // default 100KB
            maxRowSize: (1000 * 1000),  // default 1MB
            cmdType: 'eval',
            subprocessTimeout: 300,
            readOnly: false,
            collapsibleJSON: true,
            collapsibleJSONDefaultUnfold: 1,
        },
        defaultKeyNames: {}
    }
};


module.exports = config;