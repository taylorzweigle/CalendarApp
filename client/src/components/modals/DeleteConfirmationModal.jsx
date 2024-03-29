//Taylor Zweigle, 2024
import React from "react";

import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

const DeleteConfirmationModal = ({ open, onDeleteClick, onCancelClick }) => {
  return (
    <Modal title="Delete" errorModal action="Delete" open={open} onAction={onDeleteClick} onCancel={onCancelClick}>
      <Typography>Are you sure you want to delete this event?</Typography>
    </Modal>
  );
};

export default DeleteConfirmationModal;
