//Taylor Zweigle, 2024
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

import * as Actions from "../../actions";

import { useSelectedStartTimeContext } from "../../hooks/useSelectedStartTimeContext";
import { useSelectedThemeContext } from "../../hooks/useSelectedThemeContext";

import LogoutModal from "../modals/LogoutModal";

import Button from "../../core/button/Button";

import { useLogout } from "../../hooks/useLogout";

import Menu from "../../core/menu/Menu";
import MenuItem from "../../core/menu/MenuItem";

const HeaderLayout = ({ editUser }) => {
  const { dispatchSelectedStartTime } = useSelectedStartTimeContext();
  const { selectedTheme, dispatchSelectedTheme } = useSelectedThemeContext();

  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const { logout } = useLogout();

  const handleThemeButton = () => {
    dispatchSelectedTheme({ type: Actions.SET_SELECTED_THEME, payload: selectedTheme === "dark" ? "light" : "dark" });

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
      <div className="flex flex-row justify-between items-center p-4 md:p-8">
        <div>
          <Button variant="default" prefix={<MenuIcon />} onClick={() => setOpen(!open)} />
          <Menu open={open}>
            <MenuItem onClick={handleThemeButton}>{selectedTheme === "dark" ? "Set Light Theme" : "Set Dark Theme"}</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
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
