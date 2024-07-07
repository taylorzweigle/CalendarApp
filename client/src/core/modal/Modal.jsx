//Taylor Zweigle, 2024
import React from "react";

import CloseIcon from "@mui/icons-material/Close";

import Button from "../button/Button";
import Card from "../card/Card";
import Divider from "../divider/Divider";
import IconButton from "../iconButton/IconButton";
import Typography from "../typography/Typography";

const Modal = ({
  children,
  open,
  loading,
  title,
  errorModal,
  action,
  resetAction,
  onAction,
  onResetAction,
  onCancel,
}) => {
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-slate-950/75 dark:bg-slate-500/75 drop-shadow-md`}
    >
      <div className="m-auto p-4 sm:p-8 w-full sm:w-128">
        <Card>
          <div className="flex flex-row justify-between items-center p-4 sm:p-8">
            <Typography variant="heading" color="primary">
              {title}
            </Typography>
            <IconButton onClick={onCancel}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <div className="p-4 sm:p-8">{children}</div>
          <Divider />
          <div className="flex flex-row justify-between items-center p-4 sm:p-8">
            <div>
              {resetAction && (
                <Button variant="default" onClick={onResetAction}>
                  {resetAction}
                </Button>
              )}
            </div>
            <div className="flex flex-row justify-end gap-4">
              <Button variant="default" onClick={onCancel}>
                Cancel
              </Button>
              {action && (
                <Button variant={errorModal ? "error" : "primary"} onClick={onAction} loading={loading}>
                  {action}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
