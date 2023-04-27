const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MatchSchema = new Schema({
    players: [{ type: String, required: true }],
    score: [{ type: Number, required: true }],
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})
module.exports = mongoose.model('Match',MatchSchema);
// const matchModel = mongoose.model('match',matchSchema);
