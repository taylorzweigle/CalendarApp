//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import IconButton from "../../core/iconButton/IconButton";
import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

import { months } from "../calendar/Calendar";

const MonthPickerModal = ({ open, month, year, onSaveClick, onCancelClick }) => {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState({});

  useEffect(() => {
    setSelectedMonth({ month: months[month], year: year });
  }, [month, year]);

  const handleCancelClick = () => {
    setSelectedMonth({ month: months[month], year: year });
    onCancelClick();
  };

  return (
    <Modal
      title="Select Month"
      action="Select"
      resetAction="Today"
      open={open}
      onAction={() => onSaveClick(selectedMonth)}
      onResetAction={() =>
        setSelectedMonth({ month: months[new Date().getMonth()], year: new Date().getFullYear() })
      }
      onCancel={handleCancelClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <IconButton
            onClick={() => setSelectedMonth({ month: selectedMonth.month, year: selectedMonth.year - 1 })}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="heading" color="primary" bold>
            {selectedMonth.year}
          </Typography>
          <IconButton
            onClick={() => setSelectedMonth({ month: selectedMonth.month, year: selectedMonth.year + 1 })}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
        <div className="flex flex-wrap justify-center align-middle gap-4">
          {months.map((m) => (
            <div
              key={m}
              className={`inline-flex justify-center items-center h-12 w-24 md:w-20 rounded-full ${
                selectedMonth.month === m
                  ? "bg-sky-500 dark:bg-sky-500"
                  : months.indexOf(m) === today.getMonth() && selectedMonth.year === today.getFullYear()
                  ? "border-2 border-sky-500 dark:border-sky-500"
                  : "active:bg-sky-200 active:dark:bg-slate-700 md:hover:bg-sky-200 md:hover:dark:bg-slate-700"
              } cursor-pointer`}
              onClick={() => setSelectedMonth({ month: m, year: selectedMonth.year })}
            >
              <Typography variant="body" color={selectedMonth.month === m ? "white" : "textPrimary"}>
                {m.slice(0, 3)}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default MonthPickerModal;
