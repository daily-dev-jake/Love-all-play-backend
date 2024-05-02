const router = require('express').Router();
const matchController = require('../controllers/matchController');

// Route to create a new match
router.post('/create', matchController.createMatch);

// Route to add a point for the winning player
router.put('/:matchId/addPoint/:playerId', matchController.addPoint);

// // Route to remove a point from the previous player
router.put('/:matchId/removePoint/:playerId', matchController.removePoint);

// Route to get a match by id
router.get('/:matchId', matchController.deleteMatch);

// Route to delete a match
router.delete('/:matchId', matchController.deleteMatch);

module.exports = router;