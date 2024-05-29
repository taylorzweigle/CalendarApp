//Taylor Zweigle, 2024
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";

import Button from "../core/button/Button";
import Divider from "../core/divider/Divider";
import Tab from "../core/tabs/Tab";
import Typography from "../core/typography/Typography";

import SideNav from "../components/sideNav/SideNav";

import HeaderLayout from "../components/layouts/HeaderLayout";
import TodosLayout from "../components/layouts/TodosLayout";

import { useAuthContext } from "../hooks/useAuthContext";

const TodosPage = () => {
  const { user } = useAuthContext();

  const [selected, setSelected] = useState("Chores");

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav selected="Todos" />
      <div className="grid grid-cols-12 m-auto w-full bg-white dark:bg-slate-800 border-t-0 border-r border-b border-l md:border-t md:border-r md:border-b md:border-l-0 border-slate-300 dark:border-slate-600 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg shadow-md min-h-screen md:min-h-72">
        <div className="col-span-12 sm:col-span-12 md:col-span-3 md:border-r border-slate-300 dark:border-slate-600">
          <div className="grid grid-cols-12 m-auto w-full">
            <div className="col-span-12">
              <HeaderLayout
                editUser={user.username === "calendarapp_edit"}
                action={
                  <Button variant="default" prefix={<AddIcon />} onClick={() => {}}>
                    <span className="inline-flex">Add&nbsp;</span>
                    <span className="inline-flex sm:inline-flex md:hidden lg:inline-flex">Todo</span>
                  </Button>
                }
              />
              <Divider />
            </div>
            <div className="col-span-12">
              <TodosLayout editUser={user.username === "calendarapp_edit"} />
              <Divider />
            </div>
            <div className="hidden md:block col-span-12 h-48">
              <Divider />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-9 flex flex-col justify-start gap-8 p-4 md:p-8">
          <div className="flex flex-row items-center">
            <Tab value="Chores" selected={selected === "Chores"} onClick={() => setSelected("Chores")} />
            <Tab value="Shopping" selected={selected === "Shopping"} onClick={(e) => setSelected("Shopping")} />
          </div>
          {selected === "Chores" && (
            <div className="h-128">
              <Typography variant="body1">Chores</Typography>
            </div>
          )}
          {selected === "Shopping" && (
            <div className="h-128">
              <Typography variant="body1">Shopping</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
