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

const EventCard = ({ event, user, time, tag }) => {
  const colors = {
    Me: {
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-500",
      iconColor: "bg-emerald-500",
      textColor: "text-emerald-700",
    },
    Wife: {
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-500",
      iconColor: "bg-indigo-500",
      textColor: "text-indigo-700",
    },
    Us: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      iconColor: "bg-blue-500",
      textColor: "text-blue-700",
    },
    Calendar: {
      bgColor: "bg-slate-50",
      borderColor: "border-slate-500",
      iconColor: "bg-slate-500",
      textColor: "text-slate-700",
    },
  };

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
      className={`flex flex-row justify-start items-center h-14 ${colors[user].bgColor} border ${colors[user].borderColor} rounded-md overflow-clip px-2`}
    >
      <div className={`flex justify-center items-center ${colors[user].iconColor} text-white rounded w-6 h-6`}>
        {icons[tag]}
      </div>
      <div className="flex flex-col gap-0 p-2">
        <div className={`text-sm font-bold ${colors[user].textColor}`}>{event}</div>
        <div className={`text-xs ${colors[user].textColor}`}>{time}</div>
      </div>
    </div>
  );
};

export default EventCard;
