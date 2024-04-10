//Taylor Zweigle, 2024
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";

import * as Actions from "../../actions";
import * as Payloads from "../../payloads";

import { useSelectedStartTimeContext } from "../../hooks/useSelectedStartTimeContext";
import { useSelectedViewContext } from "../../hooks/useSelectedViewContext";

import LogoutModal from "../modals/LogoutModal";

import Avatar from "../../core/avatar/Avatar";
import Button from "../../core/button/Button";
import Typography from "../../core/typography/Typography";

import { useLogout } from "../../hooks/useLogout";

import image from "../../img/Me.png";

const HeaderLayout = ({ editUser }) => {
  const { selectedView, dispatchSelectedView } = useSelectedViewContext();
  const { dispatchSelectedStartTime } = useSelectedStartTimeContext();

  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);

  const { logout } = useLogout();

  const handleThemeButton = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle("dark");
  };

  const handleLogoutClick = () => {
    logout();

    setOpen(false);
  };

  return (
    <>
      <LogoutModal open={open} onLogoutClick={handleLogoutClick} onCancelClick={() => setOpen(false)} />
      <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <Avatar image={image} user="TZ" onClick={() => setOpen(true)} />
            <span className="sm:block md:hidden lg:block">
              <Typography variant="heading" truncate>
                Taylor Zweigle
              </Typography>
            </span>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <Button
              variant="default"
              prefix={selectedView === Payloads.CALENDAR_VIEW_CALENDAR ? <CalendarViewMonthIcon /> : <CalendarViewDayIcon />}
              onClick={() =>
                dispatchSelectedView(
                  selectedView === Payloads.CALENDAR_VIEW_CALENDAR
                    ? { type: Actions.SET_SELECTED_VIEW, payload: Payloads.CALENDAR_VIEW_TIMELINE }
                    : { type: Actions.SET_SELECTED_VIEW, payload: Payloads.CALENDAR_VIEW_CALENDAR }
                )
              }
            />
            <Button variant="default" prefix={darkMode ? <LightModeIcon /> : <ModeNightIcon />} onClick={handleThemeButton} />
          </div>
        </div>
        {editUser && (
          <Link to="/event">
            <Button
              variant="default"
              fullWidth
              prefix={<AddIcon />}
              onClick={() => dispatchSelectedStartTime({ type: Actions.SET_SELECTED_START_TIME, payload: "" })}
            >
              <span className="inline-flex">Add&nbsp;</span>
              <span className="inline-flex sm:inline-flex md:hidden lg:inline-flex">Event</span>
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default HeaderLayout;
