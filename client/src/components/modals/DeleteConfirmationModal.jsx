//Taylor Zweigle, 2024
import React from "react";

import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

const DeleteConfirmationModal = ({ open, type, loading, onDeleteClick, onCancelClick }) => {
  return (
    <Modal
      title="Delete"
      errorModal
      action="Delete"
      open={open}
      loading={loading}
      onAction={onDeleteClick}
      onCancel={onCancelClick}
    >
      <Typography variant="body1" color="primary">
        {`Are you sure you want to delete this ${type}?`}
      </Typography>
    </Modal>
  );
};

export default DeleteConfirmationModal;
