//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
