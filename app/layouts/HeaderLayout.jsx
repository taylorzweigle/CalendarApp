//Taylor Zweigle, 2023
"use client";

import React from "react";

import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "../components/avatar/Avatar";
import Button from "../components/button/Button";
import Typography from "../components/typography/Typography";

const HeaderLayout = ({ user }) => {
  return (
    <div className="flex flex-col gap-8 border-b border-slate-300 p-8">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Avatar user={user.slice(0, 1)} />
          <Typography variant="heading">{user}</Typography>
        </div>
        <Button prefix={<SettingsIcon />} onClick={() => {}} />
      </div>
      <Button prefix={<AddIcon />} onClick={() => {}}>
        Add Event
      </Button>
    </div>
  );
};

export default HeaderLayout;
