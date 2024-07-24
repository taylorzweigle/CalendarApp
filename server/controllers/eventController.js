//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
  const creationUser = req.user._id;

  const events = await Event.find({ creationUser });

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
  const { event, user, tag, startTime, endTime, allDay, creationTime } = req.body;

  try {
    const creationUser = req.user._id;

    const newEvent = await Event.create({
      event,
      user,
      tag,
      startTime,
      endTime,
      allDay,
      creationTime,
      creationUser,
    });

    res.status(200).json(newEvent);
  } catch (error) {
    res.status(404).json({ error: error.message });
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

  try {
    const event = await Event.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
};
