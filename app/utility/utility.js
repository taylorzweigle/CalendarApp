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

export const getColors = (color) => {
  let colorObject = {
    bg: "bg-slate-50",
    bgSolid: "bg-slate-500",
    border: "border-slate-500",
    text: "text-slate-700",
  };

  switch (color) {
    case "emerald":
      colorObject.bg = "bg-emerald-50";
      colorObject.bgSolid = "bg-emerald-500";
      colorObject.border = "border-emerald-500";
      colorObject.text = "text-emerald-700";
      break;
    case "indigo":
      colorObject.bg = "bg-indigo-50";
      colorObject.bgSolid = "bg-indigo-500";
      colorObject.border = "border-indigo-500";
      colorObject.text = "text-indigo-700";
      break;
    case "blue":
      colorObject.bg = "bg-blue-50";
      colorObject.bgSolid = "bg-blue-500";
      colorObject.border = "border-blue-500";
      colorObject.text = "text-blue-700";
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
