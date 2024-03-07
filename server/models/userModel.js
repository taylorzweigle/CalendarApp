//Taylor Zweigle, 2024
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.login = async function (username, password) {
  if (!username && !password) {
    throw new Error("Username and password are required");
  } else if (!username) {
    throw new Error("Username is required");
  } else if (!password) {
    throw new Error("Password is required");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw new Error("User does not exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid password");
  }

  return user;
};

userSchema.statics.register = async function (username, password) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be at least 8 characters");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
