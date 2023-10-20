//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import Button from "../button/Button";
import Card from "../card/Card";

const Menu = ({ button, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button prefix={button} onClick={() => setOpen(!open)}></Button>
      <div className={`absolute ${open ? "block" : "hidden"}`}>
        <Card border>{content}</Card>
      </div>
    </div>
  );
};

export default Menu;
