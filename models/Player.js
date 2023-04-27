const mongoose = require("mongoose");
const Match = require("../models/Match");
const Schema = mongoose.Schema
const PlayerSchema = new Schema({
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
});

module.exports = mongoose.model("Player", PlayerSchema);
//const playerModel = mongoose.model('Player',playerSchema);
