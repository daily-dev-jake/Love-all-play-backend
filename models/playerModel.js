const mongoose = require("mongoose");
const Schema = mongoose.Schema
const PlayerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: "",
    required: true,
    minlength: 3
  },
  avatar: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
