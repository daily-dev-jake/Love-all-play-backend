const router = require('express').Router();
let Player = require("../models/Player");

router.route('/').get((res, req) => {
    Player.find()
        .then(player => res.json(player))
        .catch(err => res.statusCode(400).json('Error: ' + err));

});

router.route("/add").post( async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    // const created = new Date();
    let existingUser;
    try{
        existingUser = await Player.findOne({ email: email });
    }catch(err){
        const error = new HttpError('signing up failed, please try again later', 500);
        return next(error);
    }
    if(existingUser){
        const error = new HttpError('User exists already, please login instead', 422);  
        return next(error);
    }
    const newPlayer = new Player({name, password, email}); 

    newPlayer.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;