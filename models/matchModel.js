const mongoose = require("mongoose");
const matchSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, // null until match is complete
    status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Match', matchSchema);
  