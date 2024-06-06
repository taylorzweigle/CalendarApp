//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  creationTime: {
    type: Date,
    required: true,
  },
  creationUser: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
