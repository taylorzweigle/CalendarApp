//Taylor Zweigle, 2025
import clsx from "clsx";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ConstructionIcon from "@mui/icons-material/Construction";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import FaceIcon from "@mui/icons-material/Face";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlightIcon from "@mui/icons-material/Flight";
import GroupsIcon from "@mui/icons-material/Groups";
import PetsIcon from "@mui/icons-material/Pets";
import StadiumIcon from "@mui/icons-material/Stadium";
import StarIcon from "@mui/icons-material/Star";
import TodayIcon from "@mui/icons-material/Today";
import WorkIcon from "@mui/icons-material/Work";

import { daysOfWeek, months } from "../components/calendar/Calendar";

export const getCalendarColor = (calendars, user) => {
  let color = "";

  for (let i = 0; i < calendars.length; i++) {
    if (calendars[i].calendar === user) {
      color = calendars[i].color;
    }
  }

  return color;
};

export const getColors = (color) => {
  let colorObject = { bg: "", hover: "", active: "", border: "", text: "", icon: "" };

  colorObject.bg = clsx(`bg-${color}-100 dark:bg-${color}-700`);
  colorObject.hover = clsx(`hover:bg-${color}-200 dark:hover:bg-${color}-600`);
  colorObject.active = clsx(`active:bg-${color}-200 dark:active:bg-${color}-600`);
  colorObject.border = clsx(`border-${color}-500 dark:border-${color}-500`);
  colorObject.text = clsx(`text-${color}-700 dark:text-white`);
  colorObject.icon = clsx(`icon-${color}-600 dark:text-white`);

  return colorObject;
};

export const getIcons = (tag) => {
  const size = "small";

  let icon = null;

  switch (tag) {
    case "Calendar":
      icon = <CalendarMonthIcon fontSize={size} />;
      break;
    case "Chores":
      icon = <ConstructionIcon fontSize={size} />;
      break;
    case "Family":
      icon = <FavoriteIcon fontSize={size} />;
      break;
    case "Friends":
      icon = <GroupsIcon fontSize={size} />;
      break;
    case "Fun":
      icon = <CameraAltIcon fontSize={size} />;
      break;
    case "Holiday":
      icon = <StarIcon fontSize={size} />;
      break;
    case "Personal":
      icon = <FaceIcon fontSize={size} />;
      break;
    case "Pet":
      icon = <PetsIcon fontSize={size} />;
      break;
    case "Sports":
      icon = <StadiumIcon fontSize={size} />;
      break;
    case "Serve":
      icon = <EscalatorWarningIcon fontSize={size} />;
      break;
    case "Travel":
      icon = <FlightIcon fontSize={size} />;
      break;
    case "Work":
      icon = <WorkIcon fontSize={size} />;
      break;
    default:
      icon = <TodayIcon fontSize={size} />;
      break;
  }

  return icon;
};

export const formatTime = (date) => {
  return `${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  } ${date.getHours() > 11 ? "PM" : "AM"}`;
};

export const formatDate = (date) => {
  return `${daysOfWeek[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

export const compareStartAndEndTimes = (start, end) => {
  let result = false;

  if (
    start.getDate() === end.getDate() &&
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear() &&
    start.getHours() === end.getHours() &&
    start.getMinutes() === end.getMinutes()
  ) {
    result = true;
  }

  return result;
};

export const isRecentlyAdded = (time) => {
  return new Date().getTime() - new Date(time).getTime() < 43200000 ? true : false;
};

export const sortEvents = (events) => {
  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < events.length; j++) {
      if (new Date(events[i].startTime).getTime() - new Date(events[j].startTime).getTime() < 0) {
        let temp = events[i];
        events[i] = events[j];
        events[j] = temp;
      }
    }
  }

  return events;
};

export const filterEvents = (query, array) => {
  let visibleCalendars = query
    .filter((calendar) => calendar.visible === true)
    .map((calendar) => calendar.calendar);

  if (array) {
    let filteredArray = [];

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < visibleCalendars.length; j++) {
        if (array[i].user === visibleCalendars[j]) {
          filteredArray = [...filteredArray, array[i]];
        }
      }
    }

    return filteredArray;
  }

  return array;
};
