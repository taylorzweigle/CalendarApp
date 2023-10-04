//Taylor Zweigle, 2023
"use client";

import React from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ConstructionIcon from "@mui/icons-material/Construction";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import FaceIcon from "@mui/icons-material/Face";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

import Typography from "../typography/Typography";

const EventCard = ({ event, time, color, tag }) => {
  const icons = {
    baseball: <SportsBaseballIcon fontSize="small" />,
    chores: <ConstructionIcon fontSize="small" />,
    football: <SportsFootballIcon fontSize="small" />,
    fun: <CameraAltIcon fontSize="small" />,
    friends: <GroupsIcon fontSize="small" />,
    holiday: <CalendarMonthIcon fontSize="small" />,
    personal: <FaceIcon fontSize="small" />,
    racing: <SportsScoreIcon fontSize="small" />,
    serve: <EscalatorWarningIcon fontSize="small" />,
  };

  return (
    <div
      className={`flex flex-row justify-start items-center h-14 bg-${color}-50 border border-${color}-500 rounded-md overflow-clip px-2`}
    >
      <div className={`flex justify-center items-center bg-${color}-500 text-white rounded w-6 h-6`}>{icons[tag]}</div>
      <div className="flex flex-col gap-0 p-2">
        <Typography variant="body2" color={`text-${color}-700`} isBold>
          {event}
        </Typography>
        <Typography variant="caption" color={`text-${color}-700`}>
          {time}
        </Typography>
      </div>
    </div>
  );
};

export default EventCard;
