const Game = require('../models/gameModel');
const Match = require('../models/matchModel');

// Add a game to a match and update match state
exports.addGameToMatch = async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const { winner, player1Score, player2Score } = req.body;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    const gameNumber = match.games.length + 1;

    // Create game
    const newGame = new Game({
      match: match._id,
      winner,
      player1Score,
      player2Score,
      gameNumber,
    });

    await newGame.save();

    // Update match
    match.games.push(newGame._id);

    // Count wins
    const gameDocs = await Game.find({ match: match._id });
    const winCounts = {};
    for (const game of gameDocs) {
      const id = game.winner.toString();
      winCounts[id] = (winCounts[id] || 0) + 1;
    }

    const winThreshold = 3;
    const winningPlayer = Object.entries(winCounts).find(([_, wins]) => wins >= winThreshold);
    if (winningPlayer) {
      match.winner = winningPlayer[0];
      match.status = 'completed';
    }

    await match.save();

    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all games for a match
exports.getGamesForMatch = async (req, res) => {
  try {
    const games = await Game.find({ match: req.params.matchId })
      .populate('winner')
      .sort({ gameNumber: 1 });

    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a game by ID
exports.deleteGameById = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
