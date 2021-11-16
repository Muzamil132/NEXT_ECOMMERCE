import { MiscellaneousServicesOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { StyledLink } from "./Styledcomponents";
import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";
const Navbar = ({ setOpen }) => {
  const { state, logoutUser } = useContext(StateContext);
  const { cart2, USER } = state;
  console.log(USER);
  const toggle = () => {
    setOpen(true);
  };

  return (
    <div>
      <AppBar className="bg-white border " elevation={0}>
        <Toolbar className="flex justify-between  ">
          <IconButton onClick={toggle}>
            <MenuIcon sx={{ color: "black", fontSize: "35px" }} />
          </IconButton>
          <div className="flex space-x-4">
            {USER == null ? (
              <StyledLink href="/register">
                <p className="font-semibold cursor-pointer">Sign in</p>
              </StyledLink>
            ) : (
              <p
                onClick={() => logoutUser()}
                className="font-semibold cursor-pointer"
              >
                Log out
              </p>
            )}

            <div className="relative">
              <div className=" text-center  absolute w-6  h-6 bg-red-400    text-white rounded-full left-3 -top-2 ">
                {cart2.length}
              </div>
              <StyledLink href="/cart">
                <ShoppingCartIcon className="h-10 w-10   cursor-pointer text-gray-600   " />
              </StyledLink>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
