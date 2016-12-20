module.exports = function (app) {

    app.get('/api/ref-data/options/areas', function (req, res) {
        var options = ["Fashion", "Music","Lifestyle","Others"];
        res.json(options);
    });

    app.get('/api/ref-data/options/tags', function (req, res) {
        var options = ["#love","#TagsForLikes","#TagsForLikesApp","#TFLers","#tweegram","#photooftheday","#20likes","#amazing","#smile","#follow4follow","#like4like","#look","#instalike","#igers","#picoftheday","#food","#instadaily","#instafollow","#followme","#girl","#iphoneonly","#instagood","#bestoftheday","#instacool","#instago","#all_shots","#follow","#webstagram","#colorful","#style","#swag"]
        res.json(options);
    });


};