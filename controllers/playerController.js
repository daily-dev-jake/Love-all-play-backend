const Player = require("../models/player");
const playerService = require("../services/playerService");
// const bcrypt = require("bcrypt");
// const googleClient = new OAuth2Client({
//   clientId: `${process.env.GOOGLE_CLIENT_ID}`,
// });

exports.createPlayer = async (request, response) => {
  // extract from request body
  console.log(request.body);
  const { name, email, avatar } = request.body;

  // Name and Email guard
  if (!name || !email)
    return res
      .status(400)
      .send({ message: "Email or name is required." });

  // Checks for existing user
  // let existingUser; 
  // try {
  //   existingUser = await Player.findOne({ email: email });
  // } catch (err) {
  //   const error = new HttpError(
  //     "signing up failed, please try again later",
  //     500
  //   );
  //   return next(error);
  // }

  // if (!existingUser) {
  //   const error = new HttpError(
  //     `User ${existingUser.name} exists already, please login instead.`,
  //     422
  //   );
  //   return next(error);
  // }

  playerService.createUser(request, response);
};


// exports.authenticateUser = async (req, res) => {
//   const { token } = req.body;

//   const ticket = await googleClient.verifyIdToken({
//     idToken: token,
//     audient: `${process.env.GOOGLE_CLIENT_ID}`,
//   });

//   const payload = ticket.getPayload();

//   let user = await playerService.findUserByEmail({ email: payload.email });
//   if (!user) {
//     await playerService.createUser(payload.name, payload.email, avatar = payload.picture);
//   }

//   res.json({ user, token });
// };

exports.getUserById = async (req, res) => {
  try {
    const id = req.query.id;
    const user = await playerService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await playerService.findUserByEmail(email);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // console.log(req.params.id);
    const user = await playerService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await playerService.deleteUser(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    else {
      res.status(200).json({ success: `User ${user.name} deleted!` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return
  };
}
// exports.signIn = (username, password) => {
//   User.findOne({
//     username: username,
//   }).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     if (!user) {
//       return res.status(404).send({ message: "User Not found." });
//     }

//     var passwordIsValid = bcrypt.compareSync(password, user.password);

//     if (!passwordIsValid) {
//       return res.status(401).send({
//         accessToken: null,
//         message: "Invalid Password!",
//       });
//     }

//     res.status(200).send({
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     });
//   });
// };
