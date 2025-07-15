const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const indexRouter = require("./routes/indexRouter");
const playerRouter = require("./routes/playerRoutes");
const matchRouter = require("./routes/matchRoutes");
const gameRouter = require("./routes/gameRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MDB_URL, { useNewUrlParser: true });

// app.use(cors()); // Allows All origins
// Allows only our dev localhost (MORE CONTROL)
const corsAllowedClient = process.env.NODE_ENV === 'production'
  ? [`${process.env.FRONTEND_ORIGIN}`]
  : [`http://localhost:${process.env.CLIENT_PORT}`];

app.use(cors({
  origin: corsAllowedClient,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use("/", indexRouter);
app.use(`/api/${process.env.API_VERSION}/player`, playerRouter);
app.use(`/api/${process.env.API_VERSION}/game`, gameRouter);
app.use(`/api/${process.env.API_VERSION}/match`, matchRouter,);

const conn = mongoose.connection;
conn.once("open", () => {
  console.log("corsAllowedClient: " + corsAllowedClient);
  console.log("MongoDB connection established successfully");
  app.listen(port, () => console.log("Connected to port " + port));
});