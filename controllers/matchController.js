const Match = require('../models/matchModel');
const Player = require('../models/playerModel')
const playerService = require("../services/playerService");
const matchController = {
  // Controller to create a new match
  async createMatch(req, res) {
    try {
      const matchPlayers = req.body;
      // if dont't have
      const players = [];
      const playersScores = [];
      // no. of players guard
      const numOfPlayers = matchPlayers.length;
      if (numOfPlayers < 2 || numOfPlayers === 3 || numOfPlayers > 4) {
        res.status(500).json({ message: "Only accepts singles/doubles match for now." });
        return;
      }
      for (let i = 0; i < numOfPlayers; i++) {
        const player = matchPlayers[i];
        // check find player by email
        let foundUser = {};
        try {
          foundUser = await playerService.findUserByEmail(player.email);
          console.log("finding user now:");
          console.log(foundUser);
          if (!foundUser) {
            try {
              foundUser = await Player.create({
                name: player.name,
                email: player.email,
              });
            } catch (err) {
              // either violate schema type or player exists
              res.status(404).json({ message: err.message });
              return;
            }
          }
          players.push(foundUser);
          playersScores.push({ player: foundUser, score: 0 });
        } catch (err) {
          res.status(404).json({ message: err.message });
        }
      }

      // TODO: check for 2 players (singles for now) and if they're registered.
      const newMatch = await Match.create(
        { matchPlayers: players, scores: playersScores, date: Date.now() }
      );
      console.log(newMatch);
      res.status(201).json(newMatch);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Controller to add a point for the winning player
  async addPoint(req, res) {
    try {
      const { matchId, playerId } = req.params;
      const match = await Match.findById(matchId);
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }

      // Assuming scores are stored as an array of objects with playerId and score fields
      const playerScore = match.scores.find(score => score.player.toString() === playerId);
      if (!playerScore) {
        return res.status(404).json({ message: 'Player not found in the match' });
      }

      playerScore.score++;
      await match.save();
      res.status(200).json(match);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Controller to remove a point from the previous player
  async removePoint(req, res) {
    try {
      const { matchId, playerId } = req.params;
      const match = await Match.findById(matchId);
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }

      const playerScore = match.scores.find(score => score.player.toString() === playerId);
      if (!playerScore) {
        return res.status(404).json({ message: 'Player not found in the match' });
      }

      if (playerScore.score > 0) {
        playerScore.score--; // Decrement player's score if it's greater than 0
        await match.save();
      }

      res.status(200).json(match);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Controller to delete a match
  async deleteMatch(req, res) {
    try {
      const { matchId } = req.params;
      await Match.findByIdAndDelete(matchId);
      res.status(204).end(); // No content returned
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = matchController;
