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
import WorkIcon from "@mui/icons-material/Work";

import Typography from "../typography/Typography";

import { getColors } from "../../utility/utility";

const EventCard = ({ event, time, color, tag, isCondensed }) => {
  const colors = getColors(color);

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
    work: <WorkIcon fontSize="small" />,
  };

  return (
    <div
      className={`flex flex-row justify-start items-center ${isCondensed ? "h-8" : "h-14"} ${colors.bg} border ${
        colors.border
      } rounded-md overflow-clip ${isCondensed ? "px-0" : "px-2"}`}
    >
      {isCondensed ? null : (
        <div className={`flex justify-center items-center ${colors.bg} text-white rounded w-6 h-6`}>{icons[tag]}</div>
      )}
      <div className="flex flex-col gap-0 p-2">
        <Typography variant="body2" color={colors.text} isBold>
          {event}
        </Typography>
        {isCondensed ? null : (
          <Typography variant="caption" color={colors.text}>
            {time}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default EventCard;
