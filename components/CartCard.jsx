import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";
import { PlusIcon, MinusIcon, XIcon } from "@heroicons/react/solid";

import { Button, CardMedia, Container, Grid, IconButton } from "@mui/material";
const CartCard = ({ product }) => {
  const { state, removeItem, increaseQty, decreaseQty } =
    useContext(StateContext);
  return (
    <Grid
      className=" shadow-md mb-4 rounded-lg flex align-center p-3"
      container
    >
      <Grid className="flex align-center space-x-6" item xs={12} lg={6}>
        <img className="w-24 h-24 rounded-lg " src={product.image} />
        <div className="flex justify-center   flex-col">
          <p className="text-lg font-semibold">{product.name}</p>
          <p className="text-sm">Color</p>
          <p className="text-sm">Size</p>
        </div>
      </Grid>

      <Grid className="flex items-center justify-between " item xs={12} lg={6}>
        <div className="flex items-center ">
          <div
            onClick={() => increaseQty(product._id)}
            className="cursor-pointer   h-9 w-9 rounded-lg flex items-center justify-center bg-gray-700"
          >
            <PlusIcon className="h-6 w-6 text-white" />
          </div>
          <div className="h-9 w-9 rounded-lg flex items-center justify-center  ">
            <p>{product.qty}</p>
          </div>
          <div
            onClick={() => decreaseQty(product._id)}
            className="cursor-pointer   h-9 w-9 rounded-lg flex items-center justify-center  bg-gray-700"
          >
            <MinusIcon className="h-6 w-6 text-white" />
          </div>
        </div>
        <p className="font-semibold">
          {(product.price * product.qty).toFixed(2)}$
        </p>
        <IconButton onClick={() => removeItem(product._id)}>
          <XIcon className="h-6 w-6 text-gray-700" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CartCard;
