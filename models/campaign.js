var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
    shortid: { type: String, required: true },
    campaignId: { type: String, required: true },
    name: { type: String, required: true },
    area: { type: String, required: true },
    description: { type: String },
    bounty: { type: String },
    joinToken: { type: String, required: true },
    tags: { type: Schema.Types.Mixed, default: true },
    participants: [{type: Schema.Types.ObjectId,ref:'User'}],
    status:{type: String, enum:['live','over','draft','accepting_alliances'], required: true, default:'draft'}
});

module.exports = mongoose.model('Campaign', campaignSchema);