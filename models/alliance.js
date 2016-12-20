var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allianceSchema = new Schema({
    shortid: { type: String, required: true },
    allianceId:{ type: String, required: true},
    name: { type: String, required: true },
    area: { type: String, required: true},
    description: { type: String},
    tags: { type: Schema.Types.Mixed, default: true }
});

module.exports = mongoose.model('Alliance', allianceSchema);