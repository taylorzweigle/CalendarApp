//Taylor Zweigle, 2023
"use client";

import React from "react";

import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "../components/avatar/Avatar";
import Button from "../components/button/Button";
import ToggleSwitch from "../components/toggleSwitch/ToggleSwitch";
import Typography from "../components/typography/Typography";

import image from "../img/Me.png";
import Menu from "../components/menu/Menu";

const HeaderLayout = ({ user }) => {
  return (
    <div className="flex flex-col gap-8 border-b border-slate-300 dark:border-slate-600 p-8">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Avatar image={image} user={user.slice(0, 1)} />
          <Typography variant="heading">{user}</Typography>
        </div>
        <Menu
          button={<SettingsIcon />}
          content={
            <div className="flex flex-col gap-4 w-56 p-8">
              <ToggleSwitch label="Dark Mode" />
            </div>
          }
        />
      </div>
      <Button prefix={<AddIcon />} onClick={() => {}}>
        Add Event
      </Button>
    </div>
  );
};

export default HeaderLayout;
