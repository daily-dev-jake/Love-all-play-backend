const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  player1Score: { type: Number, required: true },
  player2Score: { type: Number, required: true },
  gameNumber: { type: Number, required: true }, // 1, 2, or 3
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);