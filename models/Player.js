const mongoose = require("mongoose");
const Match = require("../models/Match");
const Schema = mongoose.Schema
const playerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
//   matches :[{ type: mongoose.Types.ObjectId, ref: "Match"}]
});

module.exports = mongoose.model("Player", playerSchema);
//const playerModel = mongoose.model('Player',playerSchema);
