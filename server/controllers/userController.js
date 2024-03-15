//Taylor Zweigle, 2024
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, {});
};

const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.register(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getUsers, loginUser, registerUser };
