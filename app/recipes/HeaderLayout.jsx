//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";

import Avatar from "../components/avatar/Avatar";
import Button from "../components/button/Button";
import Typography from "../components/typography/Typography";

import image from "../img/Me.png";

const HeaderLayout = ({ user, onAddEventClick }) => {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeButton = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex flex-col gap-8 border-b border-slate-300 dark:border-slate-600 p-8">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Avatar image={image} user={user.slice(0, 1)} />
          <Typography variant="heading">{user}</Typography>
        </div>
        <Button prefix={darkMode ? <ModeNightIcon /> : <LightModeIcon />} onClick={handleThemeButton} />
      </div>
      <Button prefix={<AddIcon />} onClick={onAddEventClick}>
        Add Event
      </Button>
    </div>
  );
};

export default HeaderLayout;
