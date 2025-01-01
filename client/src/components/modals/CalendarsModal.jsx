//Taylor Zweigle, 2025
import React from "react";

import Legend from "../../core/legend/Legend";
import Modal from "../../core/modal/Modal";

const CalendarsModal = ({ open, calendars, onCancelClick }) => {
  return (
    <Modal title="Calendars" open={open} onCancel={onCancelClick}>
      <div className="flex flex-col sm:flex-row md:flex-col sm:w-full sm:justify-between gap-2 sm:gap-8 md:gap-2">
        {calendars &&
          calendars.map((calendar) => (
            <Legend key={calendar.calendar} color={calendar.color} label={calendar.calendar} selected />
          ))}
      </div>
    </Modal>
  );
};

export default CalendarsModal;
