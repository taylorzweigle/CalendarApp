//Taylor Zweigle, 2023
"use client";

import React from "react";

import Image from "next/image";

const Avatar = ({ image, user }) => {
  return (
    <div className="flex justify-center items-center bg-slate-200 dark:bg-slate-600 w-12 h-12 rounded-full">
      <Image className="w-12 h-12 rounded-full" src={image} alt={user} />
    </div>
  );
};

export default Avatar;
