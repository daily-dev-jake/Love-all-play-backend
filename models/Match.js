const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const matchSchema = new Schema({
    
    score: {
        type: Number,
        require: true,
    },
    player1: { type: Schema.Types.ObjectId, ref:'player' },
    player2: { type: Schema.Types.ObjectId, ref:'player' },
})
module.exports = mongoose.model('Match',matchSchema);
// const matchModel = mongoose.model('match',matchSchema);
