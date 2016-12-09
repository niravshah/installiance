var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userStats = new Schema({
    shortid: { type: String, required: true },
    instagram_id: { type: String, default: true },
    full_name: { type: String, required: true },
    profile_picture: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    counts: { type: Mixed, required: true },
    timestamp: { type: Date },
    all_tags: { type: Mixed },
    tag_freq: { type: Mixed },
    likes: { type: Mixed }
});

module.exports = mongoose.model('UserStats', userStats);