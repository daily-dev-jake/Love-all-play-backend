const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/', matchController.createMatch);
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);
router.delete('/:id', matchController.deleteMatchById);

module.exports = router;
