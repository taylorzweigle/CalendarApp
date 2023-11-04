//Taylor Zweigle, 2023
"use client";

import React from "react";

import Divider from "../components/divider/Divider";
import List from "../components/list/List";
import Modal from "../components/modal/Modal";

import { compareStartAndEndTimes, formatDate, formatTime } from "../utility/utility";

const CalendarEventModal = ({ open, eventDetails, onDeleteClick, onCancelClick }) => {
  return (
    <Modal
      title="View Calendar Event"
      open={open}
      action="Delete"
      onAction={() => onDeleteClick(eventDetails)}
      onClose={onCancelClick}
    >
      {eventDetails && (
        <div className="flex flex-col gap-4">
          <List label="Event" value={eventDetails.event} />
          <Divider />
          <List label="User" value={eventDetails.user} />
          <Divider />
          <List label="Tag" value={eventDetails.tag} />
          <Divider />
          <List label="Date" value={formatDate(new Date(eventDetails.startTime))} />
          {!compareStartAndEndTimes(new Date(eventDetails.startTime), new Date(eventDetails.endTime)) && (
            <>
              <Divider />
              <List
                label="Time"
                value={`${formatTime(new Date(eventDetails.startTime))} - ${formatTime(new Date(eventDetails.endTime))}`}
              />
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default CalendarEventModal;
