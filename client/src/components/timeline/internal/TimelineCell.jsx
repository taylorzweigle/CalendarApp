//Taylor Zweigle, 2023
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";

const TimelineCell = ({ children, rowSpan, hover, onClick }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <td
      className={`h-12 border-t border-slate-300 dark:border-slate-600 ${rowSpan && "dark:bg-slate-100"}`}
      rowSpan={rowSpan}
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {hover && isHover && (
        <div className="flex w-full h-full justify-center items-center text-sky-500 dark:text-sky-300 hover:border-2 hover:border-sky-500 hover:dark:border-sky-300 rounded-md cursor-pointer">
          <AddIcon fontSize="small" />
        </div>
      )}
      {!hover && children}
    </td>
  );
};

export default TimelineCell;
