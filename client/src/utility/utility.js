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
  let colorObject = { bg: "", border: "", text: "", icon: "" };

  switch (color) {
    case "emerald":
      colorObject.bg = "bg-emerald-100 dark:bg-emerald-700";
      colorObject.border = "border-emerald-600 dark:border-emerald-400";
      colorObject.text = "text-emerald-700 dark:text-white";
      colorObject.icon = "text-emerald-700 dark:text-emerald-50";
      break;
    case "purple":
      colorObject.bg = "bg-purple-100 dark:bg-purple-700";
      colorObject.border = "border-purple-600 dark:border-purple-400";
      colorObject.text = "text-purple-700 dark:text-white";
      colorObject.icon = "text-purple-700 dark:text-purple-50";
      break;
    case "sky":
      colorObject.bg = "bg-sky-100 dark:bg-sky-700";
      colorObject.border = "border-sky-600 dark:border-sky-400";
      colorObject.text = "text-sky-700 dark:text-white";
      colorObject.icon = "text-sky-700 dark:text-sky-50";
      break;
    case "amber":
      colorObject.bg = "bg-amber-100 dark:bg-amber-800";
      colorObject.border = "border-amber-600 dark:border-amber-600";
      colorObject.text = "text-amber-700 dark:text-white";
      colorObject.icon = "text-amber-700 dark:text-amber-50";
      break;
    default:
      colorObject.bg = "bg-slate-50 dark:bg-slate-700";
      colorObject.border = "border-slate-500 dark:border-slate-400";
      colorObject.text = "text-slate-700 dark:text-white";
      colorObject.icon = "text-slate-700 dark:text-slate-50";
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
  return `${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12}:${date.getMinutes() === 0 ? "00" : date.getMinutes()} ${
    date.getHours() > 11 ? "PM" : "AM"
  }`;
};

export const formatDate = (date) => {
  return `${daysOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
  if (events.length > 1) {
    events.sort((eventA, eventB) => {
      if (new Date(eventA.startTime).getTime() - new Date(eventB.startTime).getTime() > 0) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  return events;
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
