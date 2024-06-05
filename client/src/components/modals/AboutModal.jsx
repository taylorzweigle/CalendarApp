//Taylor Zweigle, 2024
import React from "react";

import Modal from "../../core/modal/Modal";

import Details from "../../components/details/Details";

import { useAuthContext } from "../../hooks/useAuthContext";

const AboutModal = ({ open, onCancelClick }) => {
  const { user: authUser } = useAuthContext();

  return (
    <Modal title="About" open={open} onCancel={onCancelClick}>
      <Details label="Username" value={authUser.username} />
    </Modal>
  );
};

export default AboutModal;
