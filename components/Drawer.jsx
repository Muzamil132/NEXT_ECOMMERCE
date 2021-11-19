import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import styles from "../styles/my.module.css";
import React, { useContext } from "react";
import { StyledLink } from "./Styledcomponents";
import { StateContext } from "../Context/StateContext";

import { useRouter } from "next/router";
const Drawerr = ({ open, setOpen }) => {
  const {
    state: { USER },
  } = useContext(StateContext);

  const router = useRouter();
  const path = router.asPath;

  const Redirect = () => {
    if (USER == null) {
      router.push("/register");
    }

    router.push("/profile");
  };

  return (
    <div>
      <Drawer open={open}>
        <div style={{ position: "relative", padding: "5px", width: "100%" }}>
          <IconButton
            onClick={() => setOpen(false)}
            style={{ position: "absolute", right: "0" }}
            sx={{ p: "10px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>

        <Box sx={{ width: "280px", mt: "50px", pr: "10px" }}>
          <div
            onClick={() => Redirect()}
            className={`${
              path == "/profile" ? styles.active : styles.my
            }  group space-x-4  hover:bg-purple-100 cursor-pointer`}
          >
            <span className="group-hover:text-purple-400 text-gray-700 font-semibold    ">
              {USER != null ? USER.user.username : "PROFILE"}
            </span>
          </div>

          <StyledLink href="/">
            <div
              className={`${
                path == "/" ? styles.active : styles.my
              }  group space-x-4  hover:bg-purple-100 mt-2  `}
            >
              <span className="group-hover:text-purple-400 text-gray-700 font-semibold    ">
                HOME
              </span>
            </div>
          </StyledLink>
          <StyledLink href="/cart">
            <div
              className={`${
                path == "/cart" ? styles.active : styles.my
              }  group space-x-4  hover:bg-purple-100 mt-2  `}
            >
              <span className="group-hover:text-purple-400 text-gray-700 font-semibold    ">
                CART
              </span>
            </div>
          </StyledLink>
        </Box>
      </Drawer>
    </div>
  );
};

export default Drawerr;
