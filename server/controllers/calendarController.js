//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Calendar = require("../models/calendarModel");

const getCalendars = async (req, res) => {
  const creationUser = req.user._id;

  const calendars = await Calendar.find({ creationUser });

  res.status(200).json(calendars);
};

const getCalendar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid calendar id" });
  }

  const calendar = await Calendar.findById(id);

  if (!calendar) {
    return res.status(404).json({ error: "No calendar found" });
  }

  res.status(200).json(calendar);
};

const createCalendar = async (req, res) => {
  const { calendar, color, visible } = req.body;

  try {
    const creationUser = req.user._id;

    const newCalendar = await Calendar.create({
      calendar,
      color,
      visible,
      creationUser,
    });

    res.status(200).json(newCalendar);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteCalendar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid calendar id" });
  }

  const calendar = await Calendar.findOneAndDelete({ _id: id });

  if (!calendar) {
    return res.status(404).json({ error: "No calendar found" });
  }

  res.status(200).json(calendar);
};

const updateCalendar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid calendar id" });
  }

  try {
    const calendar = await Calendar.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json(calendar);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getCalendars,
  getCalendar,
  createCalendar,
  deleteCalendar,
  updateCalendar,
};
