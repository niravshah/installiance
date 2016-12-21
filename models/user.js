var mongoose = require('mongoose');
var generatePassword = require('password-generator');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    shortid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    resetPassword: { type: Boolean, default: true },
    emailNeedsVerification: { type: Boolean, default: true },
    emailVerificationToken:{ type: String, default:generatePassword(30,false)},
    type:{type: String, enum:['influencer','brand'], required: true, default:'influencer'},
    stats:{type:Schema.Types.ObjectId, ref:'UserStats'},
    instagram_id: { type: String, default: true },
    full_name: { type: String, required: true },
    profile_picture: { type: String, required: true },
    counts: { type: Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('User', userSchema);    