const router = require('express').Router();
const matchController = require('../controllers/matchController');
// router.route('/').get((res, req) => {
//     Match.find()
//         .then(match => res.json(match))
//         .catch(err => res.statusCode(400).json('Error: ' + err));

// });

// router.route("/add").post((req, res) => {
//     const score = req.body.score;
//     const player1 = req.body.player1;
//     const player2 = req.body.player2;
//     const newMatch = new Match({score, player1, player2}); 

//     newMatch.save()
//         .then(() => res.json("Match added!"))
//         .catch(err => res.status(400).json("Error: " + err));
// });

// Route to create a new match
router.post('/create', matchController.createMatch);

// Route to add a point for the winning player
// router.put('/:matchId/addPoint/:playerId', matchController.addPoint);

// // Route to remove a point from the previous player
// router.put('/:matchId/removePoint/:playerId', matchController.removePoint);

// Route to get a match by id
router.get('/:matchId', matchController.deleteMatch);

// Route to delete a match
router.delete('/:matchId', matchController.deleteMatch);

module.exports = router;