//Taylor Zweigle, 2024
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import MenuIcon from "@mui/icons-material/Menu";
import ViewDayIcon from "@mui/icons-material/ViewDay";

import * as Actions from "../../actions";
import * as Payloads from "../../payloads";

import { useSelectedStartTimeContext } from "../../hooks/useSelectedStartTimeContext";
import { useSelectedViewContext } from "../../hooks/useSelectedViewContext";

import LogoutModal from "../modals/LogoutModal";

import Button from "../../core/button/Button";
import Typography from "../../core/typography/Typography";

import { useLogout } from "../../hooks/useLogout";

import Menu from "../../core/menu/Menu";
import MenuItem from "../../core/menu/MenuItem";

const HeaderLayout = ({ editUser }) => {
  const { selectedView, dispatchSelectedView } = useSelectedViewContext();
  const { dispatchSelectedStartTime } = useSelectedStartTimeContext();

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const { logout } = useLogout();

  const handleThemeButton = () => {
    setDarkMode(!darkMode);
    setOpen(false);

    document.documentElement.classList.toggle("dark");
  };

  const handleLogoutClick = () => {
    setLogoutOpen(true);
    setOpen(false);
  };

  const handleLogoutModalClick = () => {
    logout();

    setLogoutOpen(false);
  };

  return (
    <>
      <LogoutModal open={logoutOpen} onLogoutClick={handleLogoutModalClick} onCancelClick={() => setLogoutOpen(false)} />
      <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <div>
              <Button variant="default" prefix={<MenuIcon />} onClick={() => setOpen(!open)} />
              <Menu open={open}>
                <MenuItem onClick={handleThemeButton}>{darkMode ? "Set Dark Theme" : "Set Light Theme"}</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </div>
            <span className="sm:block md:hidden lg:block">
              <Typography variant="heading" color="primary" wrap>
                Calendar App
              </Typography>
            </span>
          </div>
          <Button
            variant="default"
            prefix={selectedView === Payloads.CALENDAR_VIEW_CALENDAR ? <ViewDayIcon /> : <CalendarViewMonthIcon />}
            onClick={() =>
              dispatchSelectedView(
                selectedView === Payloads.CALENDAR_VIEW_CALENDAR
                  ? { type: Actions.SET_SELECTED_VIEW, payload: Payloads.CALENDAR_VIEW_TIMELINE }
                  : { type: Actions.SET_SELECTED_VIEW, payload: Payloads.CALENDAR_VIEW_CALENDAR }
              )
            }
          />
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
