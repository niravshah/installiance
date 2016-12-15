var mongoose = require('mongoose');
var generatePassword = require('password-generator');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    shortid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    resetPassword: { type: Boolean, default: true },
    emailNeedsVerification: { type: Boolean, default: true },
    emailVerificationToken:{ type: String, default:generatePassword(30,false)}
});

module.exports = mongoose.model('User', userSchema);    