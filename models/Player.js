const mongoose = require('mongoose');
const playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('Player',playerSchema);
//const playerModel = mongoose.model('Player',playerSchema);