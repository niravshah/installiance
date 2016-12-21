var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allianceSchema = new Schema({
    shortid: { type: String, required: true },
    allianceId: { type: String, required: true },
    name: { type: String, required: true },
    area: { type: String, required: true },
    description: { type: String },
    joinToken: { type: String, required: true },
    tags: { type: Schema.Types.Mixed, default: true },
    members: { type: [Schema.Types.ObjectId], default: [] }
});

module.exports = mongoose.model('Alliance', allianceSchema);