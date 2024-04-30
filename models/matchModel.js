const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MatchSchema = new Schema({
    matchPlayers: [{
        type: mongoose.ObjectId,
        ref: 'Player'
      }],
    // matchPlayers: [{ type: mongoose.ObjectId, ref: 'Player' }],
    // scores: [{
    //     player: { type: mongoose.ObjectId, ref: 'Player', default: undefined },
    //     score: { type: Number, default: 0 }
    // }],
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Match', MatchSchema);
