//Taylor Zweigle, 2024
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getUsers, loginUser, registerUser };
