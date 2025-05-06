const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/:matchId', gameController.addGameToMatch);
router.get('/:matchId', gameController.getGamesForMatch);
router.delete('/:id', gameController.deleteGameById);

module.exports = router;
