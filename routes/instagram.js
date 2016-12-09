var ig = require('instagramapi').instagram();
var async = require('async');
module.exports = function (app) {

    ig.use({
        client_id: 'e942353eeb2f4c4eb38d5ce059ee5b35',
        client_secret: '54fc1a4b2b8e45a6a04016657b03bfa6'
    });

    var redirect_uri = 'https://allyx.herokuapp.com/welcome';

    app.get('/authorize_user', function (req, res) {
        res.redirect(ig.get_authorization_url(redirect_uri, {
            scope: ['basic', 'follower_list'],
            state: 'a state'
        }));
    });

    app.get('/welcome', function (req, res) {
        ig.authorize_user(req.query.code, redirect_uri, function (err, result) {
            if (err) {
                console.log(err.body);
                res.render('error', {
                    message: "We could not authorize your request with Instagram!",
                    details: err.body
                })
            } else {
                console.log('Yay! Access token is ' + result.access_token);

                async.parallel([
                        function (cb) {
                            ig.user_self({ access_token: result.access_token },
                                function (err, userInfo, pagination, remaining,
                                          limit) {
                                    console.log('Error', err);
                                    console.log('Self', userInfo);
                                    console.log(pagination, remaining, limit);
                                    cb(err, userInfo);
                                });
                        },
                        function (cb) {
                            ig.user_self_media_recent({}, { access_token: result.access_token },
                                function (err, userInfo, pagination, remaining,
                                          limit) {
                                    console.log('Error', err);
                                    console.log('Self', userInfo);
                                    console.log(pagination, remaining, limit);
                                    cb(err, userInfo);
                                });
                        }],
                    function (err, results) {
                        if (err) {
                            console.log("Error Loop");
                            res.render('error',
                                {
                                    message: 'There was an error retrieving your details from Instagram',
                                    details: err
                                })

                        }

                        if (results.length < 2) {
                            res.render('error',
                                {
                                    message: 'We could not retrieve all your details from Instagram',
                                    details: ''
                                })
                        } else {

                            isUserInfluencer(results, function (result) {
                                if (result === true) {
                                    console.log("Returning Successful");
                                    res.render('successful',{medias:results[1]});
                                } else {
                                    console.log("Returning Unsuccessful");
                                    res.render('unsuccessful');
                                }
                            });
                        }
                    });
            }
        });
    });

    function isUserInfluencer(results, cb) {
        var follows = results[0].counts.follows;
        var followed_by = results[0].counts.followed_by;
        if (followed_by > follows) {
            cb(true);
        }
    };

    app.get('/mocktest', function (req, res) {

        var result = [];
        result[0] = {
            username: 'nirav_shah',
            bio: '',
            website: '',
            profile_picture: 'https://scontent.cdninstagram.com/t51.2885-19/s150x150/14566758_1562392083777569_4072497958686294016_a.jpg',
            full_name: 'Nirav Shah',
            counts: { media: 68, followed_by: 80, follows: 15 },
            id: '8998047'
        };
        result[1] = [{
            attribution: null,
            tags: [],
            type: 'image',
            location: [Object],
            comments: [Object],
            filter: 'Valencia',
            created_time: '1477782543',
            link: 'https://www.instagram.com/p/BMKiwF_BVFZ/',
            likes: [Object],
            images: [Object],
            users_in_photo: [],
            caption: [Object],
            user_has_liked: false,
            id: '1372061875030020441_8998047',
            user: [Object]
        },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: [Object],
                comments: [Object],
                filter: 'Slumber',
                created_time: '1477421485',
                link: 'https://www.instagram.com/p/BL_yFpyhSDW/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '1369033102537859286_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: [Object],
                comments: [Object],
                filter: 'Sierra',
                created_time: '1477137113',
                link: 'https://www.instagram.com/p/BL3TsRjBn12/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '1366647617312161142_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: [Object],
                comments: [Object],
                filter: 'Lark',
                created_time: '1477061106',
                link: 'https://www.instagram.com/p/BL1CuGzBetr/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '1366010026464242539_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: [Object],
                comments: [Object],
                filter: 'Juno',
                created_time: '1457450398',
                link: 'https://www.instagram.com/p/BCsmQ0VL6Pa/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '1201503482070148058_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Mayfair',
                created_time: '1457450268',
                link: 'https://www.instagram.com/p/BCsmA_hr6O8/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '1201502394579395516_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Lark',
                created_time: '1457450263',
                link: 'https://www.instagram.com/p/BCsmAXhr6O4/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '1201502351629722552_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Lark',
                created_time: '1457450260',
                link: 'https://www.instagram.com/p/BCsmADaL6O2/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '1201502330029056950_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: [Object],
                comments: [Object],
                filter: 'Clarendon',
                created_time: '1456310343',
                link: 'https://www.instagram.com/p/BCKnyCSL6PI/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '1191940013633283016_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: [Object],
                comments: [Object],
                filter: 'Mayfair',
                created_time: '1359316544',
                link: 'https://www.instagram.com/p/U_-yl_r6HN/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: [Object],
                user_has_liked: false,
                id: '378297049376858573_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: [Object],
                comments: [Object],
                filter: 'Walden',
                created_time: '1351539823',
                link: 'https://www.instagram.com/p/RYN3nLL6CW/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: [Object],
                user_has_liked: false,
                id: '313061170341716118_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Rise',
                created_time: '1351539778',
                link: 'https://www.instagram.com/p/RYNyDmL6CN/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '313060788542611597_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Hudson',
                created_time: '1351534618',
                link: 'https://www.instagram.com/p/RYD8KDr6KF/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '313017502209647237_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Nashville',
                created_time: '1348823459',
                link: 'https://www.instagram.com/p/QHQ0eaL6HU/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '290274675797238228_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [Object],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Hudson',
                created_time: '1343659567',
                link: 'https://www.instagram.com/p/NtXegyr6FX/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: [Object],
                user_has_liked: false,
                id: '246956806439412055_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Sutro',
                created_time: '1343599323',
                link: 'https://www.instagram.com/p/NrkkiKr6Lu/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '246451444883890926_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Valencia',
                created_time: '1336935598',
                link: 'https://www.instagram.com/p/Kk-hfrr6I_/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '190552064901751359_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'X-Pro II',
                created_time: '1335635623',
                link: 'https://www.instagram.com/p/J-PBOSL6LX/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '179647089896039127_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'Rise',
                created_time: '1329595238',
                link: 'https://www.instagram.com/p/HKN5gEr6IR/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '128976665386656273_8998047',
                user: [Object]
            },
            {
                attribution: null,
                tags: [],
                type: 'image',
                location: null,
                comments: [Object],
                filter: 'X-Pro II',
                created_time: '1329595223',
                link: 'https://www.instagram.com/p/HKN3pcL6IQ/',
                likes: [Object],
                images: [Object],
                users_in_photo: [],
                caption: null,
                user_has_liked: false,
                id: '128976538005643792_8998047',
                user: [Object]
            }]

    });


};