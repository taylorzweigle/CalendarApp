//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import { useCalendarsContext } from "../../hooks/useCalendarsContext";
import { useEventsContext } from "../../hooks/useEventsContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLogout } from "../../hooks/useLogout";
import { useTodosContext } from "../../hooks/useTodosContext";

import CalendarsModal from "../modals/CalendarsModal";
import LogoutModal from "../modals/LogoutModal";
import RecentlyAddedModal from "../modals/RecentlyAddedModal";

import Badge from "../../core/badge/Badge";
import Button from "../../core/button/Button";
import Divider from "../../core/divider/Divider";
import Label from "../../core/label/Label";
import Menu from "../../core/menu/Menu";
import MenuItem from "../../core/menu/MenuItem";

import { isRecentlyAdded } from "../../utility/utility";

const HeaderLayout = ({ action }) => {
  const { calendars } = useCalendarsContext();
  const { events } = useEventsContext();
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const { logout } = useLogout();
  const { todos } = useTodosContext();

  const [recentlyAddedEvents, setRecentlyAddedEvents] = useState([]);
  const [recentlyAddedTodos, setRecentlyAddedTodos] = useState([]);

  const [calendarsOpen, setCalendarsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [recentlyAddedOpen, setRecentlyAddedOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (events) {
      const allRecentEvents = events.filter((event) => isRecentlyAdded(event.creationTime));
      const filteredEvents = [];

      let uniqueEvents = [];

      for (let i = 0; i < allRecentEvents.length; i++) {
        if (!uniqueEvents.includes(allRecentEvents[i].event)) {
          uniqueEvents.push(allRecentEvents[i].event);

          filteredEvents.push(allRecentEvents[i]);
        }
      }

      setRecentlyAddedEvents(filteredEvents);
    }

    if (todos) {
      setRecentlyAddedTodos(todos.filter((todo) => isRecentlyAdded(todo.creationTime)));
    }
  }, [events, todos]);

  const handleRecentlyAddedClick = () => {
    setRecentlyAddedOpen(true);
    setOpen(false);
  };

  const handleCalendarsClick = () => {
    setCalendarsOpen(true);
    setOpen(false);
  };

  const handleThemeClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");

    setOpen(false);

    document.documentElement.classList.toggle("dark");
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

  const getBadgeCount = (events, todos) => {
    let count = null;

    if (events) {
      count += events;
    }

    if (todos) {
      count += todos;
    }

    return count;
  };

  return (
    <>
      <RecentlyAddedModal
        open={recentlyAddedOpen}
        events={recentlyAddedEvents}
        todos={recentlyAddedTodos}
        onCancelClick={() => setRecentlyAddedOpen(false)}
      />
      <CalendarsModal
        open={calendarsOpen}
        calendars={calendars}
        onCancelClick={() => setCalendarsOpen(false)}
      />
      <LogoutModal
        open={logoutOpen}
        loading={loading}
        onLogoutClick={handleLogoutModalClick}
        onCancelClick={() => setLogoutOpen(false)}
      />
      <div className="flex flex-row justify-between items-center p-4 md:p-8">
        <div>
          <div className="relative">
            {(recentlyAddedEvents.length > 0 || recentlyAddedTodos.length > 0) && <Badge size="large" />}
            <Button variant="outline" prefix={<MenuIcon />} onClick={() => setOpen(!open)} />
          </div>
          <Menu open={open}>
            <MenuItem
              rightSlot={
                (recentlyAddedEvents.length > 0 || recentlyAddedTodos.length > 0) && (
                  <Label>{getBadgeCount(recentlyAddedEvents.length, recentlyAddedTodos.length)}</Label>
                )
              }
              onClick={handleRecentlyAddedClick}
            >
              Recently Added
            </MenuItem>
            <MenuItem onClick={handleCalendarsClick}>Calendars</MenuItem>
            <Divider padding />
            <MenuItem onClick={handleThemeClick}>
              {theme === "dark" ? "Set Light Theme" : "Set Dark Theme"}
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
        {action}
      </div>
    </>
  );
};

export default HeaderLayout;
