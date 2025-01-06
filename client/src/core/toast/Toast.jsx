//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Typography from "../typography/Typography";

const Toast = ({ children, open }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }

    return () => {
      setVisible(false);
    };
  }, [open]);

  return (
    <div className={`${visible ? "fixed" : "hidden"} flex justify-center z-50 bottom-0 h-fit w-full`}>
      <div className="flex justify-between items-center bg-slate-300 dark:bg-slate-500 w-full md:w-96 h-14 pl-4">
        <Typography variant="body1" color="primary">
          {children}
        </Typography>
      </div>
    </div>
  );
};

export default Toast;
