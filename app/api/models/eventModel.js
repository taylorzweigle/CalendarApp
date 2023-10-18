//Taylor Zweigle, 2023
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  user: { type: String },
  event: { type: String },
  tag: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
});

module.exports = mongoose.model("Event", eventSchema);
