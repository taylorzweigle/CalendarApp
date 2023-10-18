//Taylor Zweigle, 2023
const mongoose = require("mongoose");

const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
  const events = await Event.find({});

  res.status(200).json(events);
};

const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid event id" });
  }

  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: "No event found" });
  }

  res.status(200).json(event);
};

const createEvent = async (req, res) => {
  const { user, event, tag, startTime, endTime } = req.body;

  try {
    const newEvent = await Event.create({ user, event, tag, startTime, endTime });

    res.status(200).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid event id" });
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(404).json({ error: "No event found" });
  }

  res.status(200).json(event);
};

const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid event id" });
  }

  const event = await Event.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!event) {
    return res.status(404).json({ error: "No event found" });
  }

  res.status(200).json(event);
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
