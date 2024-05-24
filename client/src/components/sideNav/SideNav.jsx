//Taylor Zweigle, 2024
import React, { useState } from "react";

import ChecklistIcon from "@mui/icons-material/Checklist";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ViewDayIcon from "@mui/icons-material/ViewDay";

import * as Actions from "../../actions";
import * as Payloads from "../../payloads";

import SideNavButton from "./internal/SideNavButton";

import { useSelectedViewContext } from "../../hooks/useSelectedViewContext";

const SideNav = () => {
  const { dispatchSelectedView } = useSelectedViewContext();

  const [selectedTab, setSelectedTab] = useState("Calendar");

  const handleCalendarClick = () => {
    setSelectedTab("Calendar");

    dispatchSelectedView({ type: Actions.SET_SELECTED_VIEW, payload: Payloads.CALENDAR_VIEW_CALENDAR });
  };

  const handleTimelineClick = () => {
    setSelectedTab("Timeline");

    dispatchSelectedView({ type: Actions.SET_SELECTED_VIEW, payload: Payloads.CALENDAR_VIEW_TIMELINE });
  };

  return (
    <div className="flex flex-col gap-0">
      <div className={`flex flex-row md:flex-col justify-center md:justify-start items-center bg-slate-200 dark:bg-slate-950`}>
        <SideNavButton
          title="Calendar"
          icon={<DateRangeIcon fontSize="medium" />}
          selected={selectedTab === "Calendar"}
          onClick={handleCalendarClick}
        />
        <SideNavButton
          title="Timeline"
          icon={<ViewDayIcon fontSize="medium" />}
          selected={selectedTab === "Timeline"}
          onClick={handleTimelineClick}
        />
        <SideNavButton
          title="Todos"
          icon={<ChecklistIcon fontSize="medium" />}
          selected={selectedTab === "Todos"}
          onClick={() => setSelectedTab("Todos")}
        />
      </div>
      <div className="hidden md:block h-full border-r-0 md:border-r border-slate-300 dark:border-slate-600">&nbsp;</div>
    </div>
  );
};

export default SideNav;
