//Taylor Zweigle, 2024
import React from "react";

import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

import Details from "../../components/details/Details";

import { useAuthContext } from "../../hooks/useAuthContext";

const AboutModal = ({ open, onCancelClick }) => {
  const { user: authUser } = useAuthContext();

  return (
    <Modal title="About" open={open} onCancel={onCancelClick}>
      <Typography variant="body1" color="primary">
        <Details label="Username" value={authUser.username} />
      </Typography>
    </Modal>
  );
};

export default AboutModal;
