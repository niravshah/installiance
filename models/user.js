var mongoose = require('mongoose');
var generatePassword = require('password-generator');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    shortid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, default:generatePassword() },
    resetPassword: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);    