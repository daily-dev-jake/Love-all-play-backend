const Player = require('../models/player');
const bcrypt = require('bcrypt');

const handleNewPlayer = async (req, res) => {
    const { name, email, pwd } = req.body;
    if( !email || pwd ) return res.status(400).json({'message':'Email and password are required.'});

    // check for duplicates in db
    const duplicate = await Player.findOne({email: email}).exec();
    if(duplicate) return res.sendStatus(409); // conflicted email

    try {
        //encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //store the new user
        const result = await Player.create({
            "name" : name,
            "email" : email,
            "password" : hashedPwd
        });
        console.log(result);
        res.status(201).json({'success' : `New player ${name} created!`});
    } catch(err){
        res.status(500).json({ 'message': err.message});
    }
}
