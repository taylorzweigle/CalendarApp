//Taylor Zweigle, 2024
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ConstructionIcon from "@mui/icons-material/Construction";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import FaceIcon from "@mui/icons-material/Face";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlightIcon from "@mui/icons-material/Flight";
import GroupsIcon from "@mui/icons-material/Groups";
import StadiumIcon from "@mui/icons-material/Stadium";
import TodayIcon from "@mui/icons-material/Today";
import WorkIcon from "@mui/icons-material/Work";

import { daysOfWeek, months } from "../components/calendar/Calendar";

export const getColors = (color) => {
  let colorObject = { bg: "", hover: "", active: "", border: "", text: "", icon: "" };

  switch (color) {
    case "emerald":
      colorObject.bg = "bg-emerald-400 dark:bg-emerald-700";
      colorObject.hover = "hover:bg-emerald-500 dark:hover:bg-emerald-600";
      colorObject.active = "active:bg-emerald-600 dark:active:bg-emerald-600";
      colorObject.border = "border-emerald-600 dark:border-emerald-500";
      colorObject.text = "text-white dark:text-white";
      colorObject.icon = "text-white dark:text-white";
      break;
    case "purple":
      colorObject.bg = "bg-purple-400 dark:bg-purple-700";
      colorObject.hover = "hover:bg-purple-500 dark:hover:bg-purple-600";
      colorObject.active = "active:bg-purple-600 dark:active:bg-purple-600";
      colorObject.border = "border-purple-600 dark:border-purple-500";
      colorObject.text = "text-white dark:text-white";
      colorObject.icon = "text-white dark:text-white";
      break;
    case "sky":
      colorObject.bg = "bg-sky-400 dark:bg-sky-700";
      colorObject.hover = "hover:bg-sky-500 dark:hover:bg-sky-600";
      colorObject.active = "active:bg-sky-600 dark:active:bg-sky-600";
      colorObject.border = "border-sky-600 dark:border-sky-500";
      colorObject.text = "text-white dark:text-white";
      colorObject.icon = "text-white dark:text-white";
      break;
    case "stone":
      colorObject.bg = "bg-stone-500 dark:bg-stone-700";
      colorObject.hover = "hover:bg-stone-600 dark:hover:bg-stone-600";
      colorObject.active = "active:bg-stone-600 dark:active:bg-stone-600";
      colorObject.border = "border-stone-600 dark:border-stone-500";
      colorObject.text = "text-white dark:text-white";
      colorObject.icon = "text-white dark:text-white";
      break;
    default:
      colorObject.bg = "bg-slate-500 dark:bg-slate-700";
      colorObject.hover = "hover:bg-slate-600 dark:hover:bg-slate-600";
      colorObject.active = "active:bg-slate-600 dark:active:bg-slate-600";
      colorObject.border = "border-slate-600 dark:border-slate-500";
      colorObject.text = "text-white dark:text-white";
      colorObject.icon = "text-white dark:text-white";
      break;
  }

  return colorObject;
};

export const getIcons = (tag) => {
  const size = "small";

  let icon = null;

  switch (tag) {
    case "chores":
      icon = <ConstructionIcon fontSize={size} />;
      break;
    case "family":
      icon = <FavoriteIcon fontSize={size} />;
      break;
    case "friends":
      icon = <GroupsIcon fontSize={size} />;
      break;
    case "fun":
      icon = <CameraAltIcon fontSize={size} />;
      break;
    case "holiday":
      icon = <CalendarMonthIcon fontSize={size} />;
      break;
    case "personal":
      icon = <FaceIcon fontSize={size} />;
      break;
    case "sports":
      icon = <StadiumIcon fontSize={size} />;
      break;
    case "serve":
      icon = <EscalatorWarningIcon fontSize={size} />;
      break;
    case "travel":
      icon = <FlightIcon fontSize={size} />;
      break;
    case "work":
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

export const sortTodos = (todos) => {
  for (let i = 0; i < todos.length; i++) {
    for (let j = 0; j < todos.length; j++) {
      if (new Date(todos[i].date).getTime() - new Date(todos[j].date).getTime() < 0) {
        let temp = todos[i];
        todos[i] = todos[j];
        todos[j] = temp;
      }
    }
  }

  return todos;
};

export const filterEvents = (query, array) => {
  if (array) {
    let filteredArray = [];

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < query.length; j++) {
        if (array[i].user === query[j]) {
          filteredArray = [...filteredArray, array[i]];
        }
      }
    }

    return filteredArray;
  }

  return array;
};
