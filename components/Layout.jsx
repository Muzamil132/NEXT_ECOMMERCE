import { AppBar, Toolbar } from "@mui/material";
import Drawerr from "./Drawer";
import React, { useState } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar setOpen={setOpen} />
      <Toolbar />
      <Drawerr setOpen={setOpen} open={open} />
      {children}
    </div>
  );
};

export default Layout;
