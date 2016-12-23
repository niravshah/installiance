var tagInfo = require('./data/tagInfo');
var tagMedia = require('./data/tagMedia');

module.exports = {

    getTagInfo: function (tag,cb) {
        if(tagInfo[tag]) {
            cb(null, tagInfo[tag]);
        }else{
            cb({error:'Tag not found'}, null)
        }
    }
};