//Taylor Zweigle, 2024
import React from "react";

import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

const LogoutModal = ({ open, loading, onLogoutClick, onCancelClick }) => {
  return (
    <Modal
      title="Logout"
      action="Logout"
      open={open}
      loading={loading}
      onAction={onLogoutClick}
      onCancel={onCancelClick}
    >
      <Typography variant="body1" color="primary">
        Are you sure you want to logout?
      </Typography>
    </Modal>
  );
};

export default LogoutModal;
