//Taylor Zweigle, 2024
const express = require("express");

const {
  getCalendars,
  getCalendar,
  createCalendar,
  deleteCalendar,
  updateCalendar,
} = require("../controllers/calendarController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getCalendars);

router.get("/:id", getCalendar);

router.post("/", createCalendar);

router.delete("/:id", deleteCalendar);

router.patch("/:id", updateCalendar);

module.exports = router;
