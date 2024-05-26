//Taylor Zweigle, 2024
import React from "react";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import EmptyState from "../../core/emptyState/EmptyState";
import Typography from "../../core/typography/Typography";

import { daysOfWeek, months } from "../calendar/Calendar";

const TodosLayout = ({ editUser }) => {
  const { selectedDate } = useSelectedDateContext();

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <Typography variant="subheading" color="primary" center>
        {`${daysOfWeek[selectedDate.weekday]}, ${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`}
      </Typography>
      <div className="flex flex-col gap-4">{true && <EmptyState type="Todo" readOnly={!editUser} />}</div>
    </div>
  );
};

export default TodosLayout;
