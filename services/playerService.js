const Player = require("../models/player");

exports.createUser = async (request, response) => {
  try {
    const { name, email, avatar } = request.body;
    //store the new user 
    const result = await Player.create({
      name: name,
      email: email,
      avatar: avatar,
    });
    console.log(result);
    response.status(201).json({ success: `New player ${name} created!` });
  } catch (err) {
    if (err.includes("E11000")) {
      response.status(500).json({ message: "Player has been created before. Please login instead." });
    }
    else {
      response.status(500).json({ message: "From MONGODB: " + err.message });
    }
  }
};

exports.getUserById = async (_id) => {
  return await Player.findById({ _id });
};

exports.findUserByEmail = async (email) => {
  return await Player.findOne({ email });
};

exports.updateUser = async (_id, userData) => {
  return await Player.findByIdAndUpdate(_id, userData, { new: true });
};

exports.deleteUser = async (_id) => {
  return await Player.findByIdAndDelete(_id);
};


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