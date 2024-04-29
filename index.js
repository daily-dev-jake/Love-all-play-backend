const express = require("express");
const mongoose = require("mongoose");
const { OAuth2Client } = require('google-auth-library');
var cors = require("cors");

const matchRouter = require("./routes/matchRouter");
const playerRouter = require("./routes/playerRouter");
const indexRouter = require("./routes/indexRouter");
const googleAuthRouter = require('./auth/authRouter');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MDB_URL, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());
app.use("/", indexRouter);
app.use(`/api/${process.env.API_VERSION}/auth`, googleAuthRouter);
app.use(`/api/${process.env.API_VERSION}/match`, matchRouter,);
app.use(`/api/${process.env.API_VERSION}/player`, playerRouter);

// app.post('/auth/google', async (req, res) => {
//   // console.log(req.body.code);

//   const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
//   // console.log(tokens);
//   res.json(tokens);
//   verify(tokens.id_token).catch(console.error);
// });

// async function verify(token) {
//   const ticket = await oAuth2Client.verifyIdToken({
//     idToken: token,
//     audience: process.env.GOOGLE_CLIENT_ID,
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   const userRealName = payload['name'];
//   const email = payload['email'];
//   const picture = payload['picture'];

//   console.log("User's Google ID is:  " + userid);
//   console.log("User's Name is:  " + userRealName);
//   console.log("User's email is:  " + email);
//   console.log("User's picture is:  " + picture);
//   // redirect to create a player with that settings
// }

// app.post('/auth/google/refresh-token', async (req, res) => {
//   const user = new UserRefreshClient(
//     clientId,
//     clientSecret,
//     req.body.refreshToken,
//   );
//   const { credentials } = await user.refreshAccessToken(); // optain new tokens
//   res.json(credentials);
// })


const conn = mongoose.connection;
conn.once("open", () => {
  console.log("MongoDB connection established successfully");
  app.listen(port, () => console.log("Connected to port " + port));
});