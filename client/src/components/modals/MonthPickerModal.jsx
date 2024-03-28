//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Chip from "../../core/chip/Chip";
import Modal from "../../core/modal/Modal";

import { months } from "../calendar/Calendar";

const MonthPickerModal = ({ open, month, year, onSaveClick, onCancelClick }) => {
  const [selectedMonth, setSelectedMonth] = useState({});

  useEffect(() => {
    setSelectedMonth({ month: months[month], year: year });
  }, [month]);

  const handleCancelClick = () => {
    setSelectedMonth({ month: months[month], year: year });
    onCancelClick();
  };

  return (
    <Modal
      title="Select Month"
      action="Select"
      open={open}
      onAction={() => onSaveClick(selectedMonth.month)}
      onCancel={handleCancelClick}
    >
      <div className="flex flex-wrap justify-center align-middle gap-4">
        {months.map((m) => (
          <Chip key={m} selected={selectedMonth.month === m} onClick={() => setSelectedMonth({ month: m, year: year })}>
            {m.slice(0, 3)}
          </Chip>
        ))}
      </div>
    </Modal>
  );
};

export default MonthPickerModal;
