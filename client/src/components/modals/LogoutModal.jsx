//Taylor Zweigle, 2024
import React from "react";

import Button from "../../core/button/Button";
import Card from "../../core/card/Card";
import Typography from "../../core/typography/Typography";

const LogoutModal = ({ open, onLogoutClick, onCancelClick }) => {
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-slate-950/50 dark:bg-slate-500/50 drop-shadow-md`}
    >
      <div className="m-auto p-8 w-full sm:w-128">
        <Card>
          <div className="flex flex-col gap-8 p-8">
            <Typography variant="heading">Logout</Typography>
            <Typography>Are you sure you want to logout?</Typography>
            <div className="flex flex-row justify-end gap-4">
              <Button variant="default" onClick={onCancelClick}>
                Cancel
              </Button>
              <Button variant="error" onClick={onLogoutClick}>
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LogoutModal;
