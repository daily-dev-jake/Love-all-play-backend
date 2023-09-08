const router = require('express').Router();
const playerController = require('../controllers/playerController');
let Player = require("../models/player");

router.route('/', playerController.authenticateUser).get((res, req) => {
    Player.find()
        .then(player => res.json(player))
        .catch(err => res.statusCode(400).json('Error: ' + err));

});

router.route("/add").post( (userData)=> {
  playerController.createPlayer(userData);
});

router.route("/find/:userId").get((res,req) =>{
  playerController.getUserById(res.params.userId)
});

module.exports = router;

