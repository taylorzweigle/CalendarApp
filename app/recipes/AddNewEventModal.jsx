//Taylor Zweigle, 2023
"use client";

import React from "react";

import Modal from "../components/modal/Modal";

const AddNewEventModal = ({ open, onSaveClick, onCancelClick }) => {
  return <Modal title="Add New Event" open={open} action="Save" onAction={onSaveClick} onClose={onCancelClick}></Modal>;
};

export default AddNewEventModal;
