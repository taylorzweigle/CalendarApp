//Taylor Zweigle, 2024
import React from "react";

import ChecklistIcon from "@mui/icons-material/Checklist";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ViewDayIcon from "@mui/icons-material/ViewDay";

import SideNavButton from "./internal/SideNavButton";

const SideNav = ({ selected }) => {
  return (
    <div className="flex flex-col gap-0 z-50">
      <div className={`flex flex-row md:flex-col justify-center md:justify-start items-center bg-slate-200 dark:bg-slate-950`}>
        <SideNavButton title="Calendar" icon={<DateRangeIcon fontSize="medium" />} selected={selected === "Calendar"} to="/" />
        <SideNavButton title="Day" icon={<ViewDayIcon fontSize="medium" />} selected={selected === "Day"} to="/day" />
        <SideNavButton title="Todos" icon={<ChecklistIcon fontSize="medium" />} selected={selected === "Todos"} to="/todos" />
      </div>
      <div className="hidden md:block h-full border-r-0 md:border-r border-slate-300 dark:border-slate-600">&nbsp;</div>
    </div>
  );
};

export default SideNav;
