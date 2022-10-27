const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MDB_URL, { useNewUrlParser: true });

const matchRouter = require("./routes/matchRouter");
const playerRouter = require("./routes/playerRouter");
app.use("/match", matchRouter);
app.use("/player", playerRouter);

const conn = mongoose.connection;
conn.once("open", () => {
  console.log("MongoDB connection established successfully");
  app.listen(port, () => console.log("Connected to port " + port));
});