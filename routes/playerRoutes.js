const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.post('/', playerController.createPlayer);
router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.get('/name/:name', playerController.getPlayerByName);
router.get('/email/:email', playerController.getPlayerByEmail);
router.put('/:id', playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);

module.exports = router;