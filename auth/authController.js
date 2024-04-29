const { OAuth2Client } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage",
);

async function verify(token) {
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const userRealName = payload['name'];
  const email = payload['email'];
  const picture = payload['picture'];

  console.log("User's Google ID is:  " + userid);
  console.log("User's Name is:  " + userRealName);
  console.log("User's email is:  " + email);
  console.log("User's picture is:  " + picture);
  // redirect to create a player with that settings
  res.status(200).json({
    status: 'success',
    data: {
      userRealName,
      email,
      picture
    }
  })
}

exports.authenticateUser = async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code);
  // console.log(tokens);
  verify(tokens.id_token).catch(() => {
    console.error;
    res.status(401).json({
      status: 'failed',
      message: 'Google login failed'
    })
  });
  // res.json(tokens);
};