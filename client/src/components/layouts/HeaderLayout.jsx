//Taylor Zweigle, 2024
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";

import Avatar from "../../core/avatar/Avatar";
import Button from "../../core/button/Button";
import Typography from "../../core/typography/Typography";

import image from "../../img/Me.png";

const HeaderLayout = ({ user, onAddEventClick }) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeButton = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-8 border-b border-slate-300 dark:border-slate-600 p-4 sm:p-8">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Avatar image={image} user={user.slice(0, 1)} />
          <span className="sm:block md:hidden lg:block">
            <Typography variant="heading" truncate>
              {user}
            </Typography>
          </span>
        </div>
        <Button prefix={darkMode ? <LightModeIcon /> : <ModeNightIcon />} onClick={handleThemeButton} />
      </div>
      <Button prefix={<AddIcon />} onClick={onAddEventClick}>
        <span className="inline-flex">Add&nbsp;</span>
        <span className="inline-flex sm:inline-flex md:hidden lg:inline-flex">Event</span>
      </Button>
    </div>
  );
};

export default HeaderLayout;