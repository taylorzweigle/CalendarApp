//Taylor Zweigle, 2024
import React from "react";

import Button from "../button/Button";
import Card from "../card/Card";
import Typography from "../typography/Typography";

const Modal = ({ children, open, title, errorModal, action, onAction, onCancel }) => {
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-slate-950/75 dark:bg-slate-500/75 drop-shadow-md`}
    >
      <div className="m-auto p-4 sm:p-8 w-full sm:w-128">
        <Card>
          <div className="p-4 sm:p-8">
            <Typography variant="heading">{title}</Typography>
          </div>
          <div className="pl-4 sm:pl-8 pr-4 sm:pr-8 pb-4 sm:pb-8">{children}</div>
          <div className="flex flex-row justify-end gap-4 border-t border-slate-300 dark:border-slate-600 p-4 sm:p-8">
            <Button variant="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant={errorModal ? "error" : "primary"} onClick={onAction}>
              {action}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
