const Player = require("../models/player");
const playerService = require("../services/playerService");
const { Request, Response } = require("express");
const { OAuth2Client } = require("google-auth-library");
// const bcrypt = require("bcrypt");
const googleClient = new OAuth2Client({
  clientId:`${process.env.GOOGLE_CLIENT_ID}`,
});

// exports.createPlayer = async (userData) => {
//   [req, res, next] = userData;
//   console.log(req.body);
//   const { name, email, password } = req.body;
//   // const created = new Date();
//   let existingUser; // Checks for existing user
//   try {
//     existingUser = await Player.findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError(
//       "signing up failed, please try again later",
//       500
//     );
//     return next(error);
//   }
//   if (existingUser) {
//     const error = new HttpError(
//       `User ${existingUser.name} exists already, please login instead`,
//       422
//     );
//     return next(error);
//   }
//   if (!email || !password)
//     return res
//       .status(400)
//       .json({ message: "Email and password are required." });

//   playerService.createUser(name, email, password);
// };

exports.authenticateUser = async (req, res) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audient: `${process.env.GOOGLE_CLIENT_ID}`,
  });

  const payload = ticket.getPayload();

  let user = await playerService.findUserByEmail({ email: payload.email });
  if (!user) {
    await playerService.createUser(payload.name, payload.email, avatar=payload.picture);
  }

  res.json({ user, token });
};

exports.signIn = (username, password) => {
  User.findOne({
    username: username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  });
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
