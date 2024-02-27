//Taylor Zweigle, 2024
import React, { useState } from "react";

import Chip from "../../core/chip/Chip";
import Modal from "../../core/modal/Modal";

import { months } from "../calendar/Calendar";

const MonthPickerModal = ({ open, selectedMonth, onSaveClick, onCancelClick }) => {
  const [month, setMonth] = useState(months[selectedMonth]);

  const handleCancelClick = () => {
    setMonth(months[selectedMonth]);
    onCancelClick();
  };

  return (
    <Modal title="Select Month" action="Select" open={open} onAction={() => onSaveClick(month)} onClose={handleCancelClick}>
      <div className="flex flex-wrap justify-center align-middle gap-4">
        {months.map((m) => (
          <Chip key={m} selected={month === m} onClick={() => setMonth(m)}>
            {m.slice(0, 3)}
          </Chip>
        ))}
      </div>
    </Modal>
  );
};

export default MonthPickerModal;