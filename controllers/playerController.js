const Player = require('../models/playerModel');

// Create a new player
exports.createPlayer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const player = new Player({ name, email });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get player by name
exports.getPlayerByName = async (req, res) => {
  try {
    const name = req.params.name;
    const player = await Player.findOne({ name });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get player by email
exports.getPlayerByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const player = await Player.findOne({ email });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a player by ID
exports.updatePlayer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a player by ID
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
