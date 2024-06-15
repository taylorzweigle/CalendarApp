//Taylor Zweigle, 2024
import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import * as Actions from "../../actions";

import { useSelectedThemeContext } from "../../hooks/useSelectedThemeContext";

import AboutModal from "../modals/AboutModal";
import LogoutModal from "../modals/LogoutModal";

import Button from "../../core/button/Button";

import { useLogout } from "../../hooks/useLogout";

import Menu from "../../core/menu/Menu";
import MenuItem from "../../core/menu/MenuItem";

const HeaderLayout = ({ action }) => {
  const { selectedTheme, dispatchSelectedTheme } = useSelectedThemeContext();

  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const { logout } = useLogout();

  const handleThemeButton = () => {
    dispatchSelectedTheme({
      type: Actions.SET_SELECTED_THEME,
      payload: selectedTheme === "dark" ? "light" : "dark",
    });

    setOpen(false);

    document.documentElement.classList.toggle("dark");
  };

  const handleAboutClick = () => {
    setAboutOpen(true);
    setOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutOpen(true);
    setOpen(false);
  };

  const handleLogoutModalClick = () => {
    setLoading(true);

    if (loading) {
      return;
    }

    logout();

    setLogoutOpen(false);

    setLoading(false);
  };

  return (
    <>
      <AboutModal open={aboutOpen} onCancelClick={() => setAboutOpen(false)} />
      <LogoutModal
        open={logoutOpen}
        loading={loading}
        onLogoutClick={handleLogoutModalClick}
        onCancelClick={() => setLogoutOpen(false)}
      />
      <div className="flex flex-row justify-between items-center p-4 md:p-8">
        <div>
          <Button variant="default" prefix={<MenuIcon />} onClick={() => setOpen(!open)} />
          <Menu open={open}>
            <MenuItem onClick={handleThemeButton}>
              {selectedTheme === "dark" ? "Set Light Theme" : "Set Dark Theme"}
            </MenuItem>
            <MenuItem onClick={handleAboutClick}>About</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
        {action}
      </div>
    </>
  );
};

export default HeaderLayout;
