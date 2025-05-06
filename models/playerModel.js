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
  email: {
    type: String,
    default: "",
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Player", PlayerSchema);
