//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useTodosContext } from "../hooks/useTodosContext";

import { getTodos } from "../api/todos";

import Button from "../core/button/Button";
import Divider from "../core/divider/Divider";

import SideNav from "../components/sideNav/SideNav";

import HeaderLayout from "../components/layouts/HeaderLayout";
import LegendLayout from "../components/layouts/LegendLayout";
import TodoLayout from "../components/layouts/TodoLayout";

import { calendars } from "../utility/calendars";
import { filterEvents } from "../utility/utility";

const TodosPage = () => {
  const { user: authUser } = useAuthContext();
  const { todos, dispatch } = useTodosContext();

  const [visibleCalendars, setVisibleCalendars] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos(authUser.token);

      dispatch({ type: Actions.GET_TODOS, payload: todos.json });
    };

    if (authUser) {
      fetchTodos();
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    setVisibleCalendars(calendars.map((calendar) => calendar.user));
  }, []);

  const handleLegendChange = (calendar) => {
    if (visibleCalendars.length === 1) {
      if (visibleCalendars.includes(calendar)) {
        setVisibleCalendars(calendars.map((calendar) => calendar.user));
      } else {
        setVisibleCalendars(
          calendars
            .map((calendar) => calendar.user)
            .filter((visibleCalendar) => visibleCalendar === calendar)
        );
      }
    } else {
      setVisibleCalendars(visibleCalendars.filter((visibleCalendar) => visibleCalendar === calendar));
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav selected="Todos" />
      <div className="grid grid-cols-12 m-auto w-full bg-white dark:bg-slate-800 border-t-0 border-r border-b border-l md:border-t md:border-r md:border-b md:border-l-0 border-slate-300 dark:border-slate-600 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg shadow-md">
        <div className="col-span-12 sm:col-span-12 md:col-span-3 md:border-r border-slate-300 dark:border-slate-600">
          <div className="grid grid-cols-12 m-auto w-full">
            <div className="col-span-12">
              <HeaderLayout
                action={
                  <Link to="/todo">
                    <Button variant="default" prefix={<AddIcon />} onClick={() => {}}>
                      <span className="inline-flex">Add&nbsp;</span>
                      <span className="inline-flex sm:inline-flex md:hidden lg:inline-flex">Todo</span>
                    </Button>
                  </Link>
                }
              />
              <Divider />
            </div>
            <div className="hidden md:block col-span-12">
              <LegendLayout
                calendars={calendars.filter((calendar) => calendar.user !== "Calendar")}
                visibleCalendars={visibleCalendars}
                onClick={handleLegendChange}
              />
              <Divider />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-9 flex flex-col gap-0 md:gap-8 p-0 md:p-8">
          <TodoLayout data={filterEvents(visibleCalendars, todos)} />
          <div className="block md:hidden col-span-12">
            <Divider />
            <LegendLayout
              calendars={calendars.filter((calendar) => calendar.user !== "Calendar")}
              visibleCalendars={visibleCalendars}
              onClick={handleLegendChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
