//Taylor Zweigle, 2024
import React, { useState } from "react";

import SideNav from "../components/sideNav/SideNav";

import Tab from "../core/tabs/Tab";

const TodosPage = () => {
  const [selected, setSelected] = useState("Chores");

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav selected="Todos" />
      <div className="grid grid-cols-12 m-auto w-full bg-white dark:bg-slate-800 border-t-0 border-r border-b border-l md:border-t md:border-r md:border-b md:border-l-0 border-slate-300 dark:border-slate-600 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg shadow-md min-h-screen md:min-h-72">
        <div className="col-span-12 p-4 md:p-8">
          <div className="flex flex-row items-center">
            <Tab value="Chores" selected={selected === "Chores"} onClick={() => setSelected("Chores")} />
            <Tab value="Shopping" selected={selected === "Shopping"} onClick={(e) => setSelected("Shopping")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
