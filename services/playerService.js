const Player = require("../models/player");
// var bcrypt = require("bcryptjs");

// exports.createUser = async (name, email, password) => {
//   try {
//     //encrypt password
//     const hashedPwd = await bcrypt.hash(password, 10);

//     //store the new user
//     const result = await Player.create({
//       name: name,
//       email: email,
//       password: hashedPwd,
//     });
//     console.log(result);
//     res.status(201).json({ success: `New player ${name} created!` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.createUser = async (name, email, avatar) => {
  try {
    //store the new user
    const result = await Player.create({
      name: name,
      email: email,
      avatar: avatar,
    });
    console.log(result);
    res.status(201).json({ success: `New player ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (userId) => {
  return await Player.findOne({ userId });
};

exports.findUserByEmail = async (email) => {
  return await Player.findOne({ email });
};

exports.updateUser = async (userId, userData) => {
  return await Player.findByIdAndUpdate(userId, userData, { new: true });
};

exports.deleteUser = async (userId) => {
  return await Player.findByIdAndDelete(userId);
};
