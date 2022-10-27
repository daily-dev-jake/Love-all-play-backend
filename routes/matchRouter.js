const router = require('express').Router();
let Match = require("../models/Match");

router.route('/').get((res, req) => {
    Match.find()
        .then(match => res.json(match))
        .catch(err => res.statusCode(400).json('Error: ' + err));

});

router.route("/add").post((req, res) => {
    const score = req.body.score;
    const player1 = req.body.player1;
    const player2 = req.body.player2;
    const newMatch = new Match({score, player1, player2}); 

    newMatch.save()
        .then(() => res.json("Match added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;