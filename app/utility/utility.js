//Taylor Zweigle, 2023
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ConstructionIcon from "@mui/icons-material/Construction";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import FaceIcon from "@mui/icons-material/Face";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import TodayIcon from "@mui/icons-material/Today";
import WorkIcon from "@mui/icons-material/Work";

import { daysOfWeek, months } from "../components/calendar/Calendar";

export const getColors = (color) => {
  let colorObject = {
    bg: "bg-slate-50 dark:bg-slate-700",
    border: "border-slate-500 dark:border-slate-400",
    text: "text-slate-700 dark:text-slate-50",
    icon: "text-slate-700 dark:text-slate-50",
  };

  switch (color) {
    case "emerald":
      colorObject.bg = "bg-emerald-100 dark:bg-emerald-700";
      colorObject.border = "border-emerald-600 dark:border-emerald-400";
      colorObject.text = "text-emerald-700 dark:text-emerald-50";
      colorObject.icon = "text-emerald-700 dark:text-white";
      break;
    case "indigo":
      colorObject.bg = "bg-indigo-100 dark:bg-indigo-700";
      colorObject.border = "border-indigo-600 dark:border-indigo-400";
      colorObject.text = "text-indigo-700 dark:text-indigo-50";
      colorObject.icon = "text-indigo-700 dark:text-indigo-50";
      break;
    case "purple":
      colorObject.bg = "bg-purple-100 dark:bg-purple-700";
      colorObject.border = "border-purple-600 dark:border-purple-400";
      colorObject.text = "text-purple-700 dark:text-purple-50";
      colorObject.icon = "text-purple-700 dark:text-purple-50";
      break;
    case "sky":
      colorObject.bg = "bg-sky-100 dark:bg-sky-700";
      colorObject.border = "border-sky-600 dark:border-sky-400";
      colorObject.text = "text-sky-700 dark:text-sky-50";
      colorObject.icon = "text-sky-700 dark:text-sky-50";
      break;
  }

  return colorObject;
};

export const getIcons = (tag) => {
  const size = "small";

  let icon = <TodayIcon fontSize={size} />;

  switch (tag) {
    case "baseball":
      icon = <SportsBaseballIcon fontSize={size} />;
      break;
    case "chores":
      icon = <ConstructionIcon fontSize={size} />;
      break;
    case "football":
      icon = <SportsFootballIcon fontSize={size} />;
      break;
    case "fun":
      icon = <CameraAltIcon fontSize={size} />;
      break;
    case "friends":
      icon = <GroupsIcon fontSize={size} />;
      break;
    case "holiday":
      icon = <CalendarMonthIcon fontSize={size} />;
      break;
    case "personal":
      icon = <FaceIcon fontSize={size} />;
      break;
    case "racing":
      icon = <SportsScoreIcon fontSize={size} />;
      break;
    case "serve":
      icon = <EscalatorWarningIcon fontSize={size} />;
      break;
    case "work":
      icon = <WorkIcon fontSize={size} />;
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
