//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Chip from "../../core/chip/Chip";
import IconButton from "../../core/iconButton/IconButton";
import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

import { months } from "../calendar/Calendar";

const MonthPickerModal = ({ open, month, year, onSaveClick, onCancelClick }) => {
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
      open={open}
      onAction={() => onSaveClick(selectedMonth)}
      onCancel={handleCancelClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <IconButton
            color="text-slate-950 dark:text-white"
            onClick={() => setSelectedMonth({ month: selectedMonth.month, year: selectedMonth.year - 1 })}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="heading" color="primary" bold>
            {selectedMonth.year}
          </Typography>
          <IconButton
            color="text-slate-950 dark:text-white"
            onClick={() => setSelectedMonth({ month: selectedMonth.month, year: selectedMonth.year + 1 })}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
        <div className="flex flex-wrap justify-center align-middle gap-4">
          {months.map((m) => (
            <Chip
              key={m}
              selected={selectedMonth.month === m}
              onClick={() => setSelectedMonth({ month: m, year: selectedMonth.year })}
            >
              {m.slice(0, 3)}
            </Chip>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default MonthPickerModal;
