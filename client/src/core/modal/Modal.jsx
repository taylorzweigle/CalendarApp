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
      } fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-slate-950/50 dark:bg-slate-500/50 drop-shadow-md`}
    >
      <div className="m-auto p-8 w-full sm:w-128">
        <Card>
          <div className="flex flex-col gap-8 p-8">
            <Typography variant="heading">{title}</Typography>
            {children}
            <div className="flex flex-row justify-end gap-4">
              <Button variant="default" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant={errorModal ? "error" : "primary"} onClick={onAction}>
                {action}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
