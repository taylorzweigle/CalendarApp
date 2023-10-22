//Taylor Zweigle, 2023
"use client";

import React from "react";

import Modal from "../components/modal/Modal";
import Typography from "../components/typography/Typography";

import { formatDate, formatTime } from "../utility/utility";

const CalendarEventModal = ({ open, eventDetails, onDeleteClick, onCancelClick }) => {
  return (
    <Modal title="View Calendar Event" open={open} action="Delete" onAction={onDeleteClick} onClose={onCancelClick}>
      {eventDetails ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <Typography variant="body2" color="text-slate-500 dark:text-slate-400">
              Event
            </Typography>
            <Typography variant="subheading">{eventDetails && eventDetails.event}</Typography>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Typography variant="body2" color="text-slate-500 dark:text-slate-400">
              User
            </Typography>
            <Typography variant="subheading">{eventDetails && eventDetails.user}</Typography>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Typography variant="body2" color="text-slate-500 dark:text-slate-400">
              Type
            </Typography>
            <Typography variant="subheading">{eventDetails && eventDetails.tag}</Typography>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Typography variant="body2" color="text-slate-500 dark:text-slate-400">
              Date
            </Typography>
            <Typography variant="subheading">{eventDetails && formatDate(new Date(eventDetails.startTime))}</Typography>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Typography variant="body2" color="text-slate-500 dark:text-slate-400">
              Start Time
            </Typography>
            <Typography variant="subheading">{eventDetails && formatTime(new Date(eventDetails.startTime))}</Typography>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Typography variant="body2" color="text-slate-500 dark:text-slate-400">
              End Time
            </Typography>
            <Typography variant="subheading">{eventDetails && formatTime(new Date(eventDetails.endTime))}</Typography>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default CalendarEventModal;
