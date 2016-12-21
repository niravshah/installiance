var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userStats = new Schema({
    shortid: { type: String, required: true },
    instagram_id: { type: String, default: true },
    full_name: { type: String, required: true },
    profile_picture: { type: String, required: true },
    counts: { type: Schema.Types.Mixed, required: true },
    timestamp: { type: Date },
    all_tags: { type: Schema.Types.Mixed },
    tag_freq: { type: Schema.Types.Mixed },
    likes: { type: Schema.Types.Mixed }
});

module.exports = mongoose.model('UserStats', userStats);