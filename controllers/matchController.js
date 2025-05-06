const Match = require('../models/matchModel');
const Game = require('../models/gameModel');

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const { player1, player2 } = req.body;

    const match = new Match({ player1, player2 });
    await match.save();

    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('player1')
      .populate('player2')
      .populate('games')
      .populate('winner')
      .sort({ createdAt: -1 });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single match by ID
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('player1')
      .populate('player2')
      .populate('games')
      .populate('winner');

    if (!match) return res.status(404).json({ message: 'Match not found' });

    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//deleteMatchById
// Delete a match by ID
exports.deleteMatchById = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
