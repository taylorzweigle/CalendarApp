//Taylor Zweigle, 2024
import React, { useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import Button from "../../core/button/Button";
import Typography from "../../core/typography/Typography";

import { months } from "../calendar/Calendar";

const TimelineLayout = ({ data }) => {
  const { selectedDate } = useSelectedDateContext();

  const [monthPicker, setMonthPicker] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8 pt-4 pl-4 pr-4 md:pt-0 md:pl-0 md:pr-0">
        <div className="flex flex-row justify-between sm:justify-between md:gap-4 items-center">
          <Typography variant="title">{`${months[selectedDate.month]} ${selectedDate.year}`}</Typography>
          <Button variant="default" prefix={<ArrowDropDownIcon />} onClick={() => setMonthPicker(!monthPicker)} />
        </div>
      </div>
      <div className="p-4 md:p-0"></div>
    </>
  );
};

export default TimelineLayout;
