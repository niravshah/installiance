var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
    shortid: { type: String, required: true },
    campaignId: { type: String, required: true },
    name: { type: String, required: true },
    area: { type: String, required: true },
    description: { type: String },
    description: { type: bounty },
    joinToken: { type: String, required: true },
    tags: { type: Schema.Types.Mixed, default: true },
    members: { type: [Schema.Types.ObjectId], default: [] }
});

module.exports = mongoose.model('Campaign', campaignSchema);