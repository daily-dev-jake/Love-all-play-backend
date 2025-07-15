const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
// id refers to corresponding match id (NOT Game id)
router.post('/', gameController.addGameToMatch);
router.get('/:id', gameController.getGamesForMatch);
router.delete('/:id', gameController.deleteGameById);

module.exports = router;
