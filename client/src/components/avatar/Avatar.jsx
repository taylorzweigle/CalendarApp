//Taylor Zweigle, 2024
import React from "react";

const Avatar = ({ image, user }) => {
  return (
    <div className="flex justify-center items-center bg-slate-200 dark:bg-slate-600 w-12 h-12 rounded-full">
      <img className="w-12 h-12 rounded-full" src={image} alt={user} />
    </div>
  );
};

export default Avatar;
