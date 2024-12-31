//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  calendar: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  creationUser: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Calendar", calendarSchema);
