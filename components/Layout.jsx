import { AppBar, Toolbar } from "@mui/material";
import Drawerr from "./Drawer";
import { StateContext } from "../Context/StateContext";
import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { fetchData } = useContext(StateContext);

  useEffect(() => {
    fetchData();
  }, []);

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
