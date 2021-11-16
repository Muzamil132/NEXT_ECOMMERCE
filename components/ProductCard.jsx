import {
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActions,
  Button,
  Card,
} from "@mui/material";
import React, { useContext } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { StateContext } from "../Context/StateContext";
import { StyledLink } from "./Styledcomponents";
import Link from "next/link";
const ProductCard = ({ product }) => {
  const { state, addItem } = useContext(StateContext);

  return (
    <Grid
      justifyContent="center"
      className="my-3  flex justify-center"
      item
      xs="12"
      md="6"
      lg="4"
    >
      <Card
        className=" shadow-lg  hover:shadow-2xl bg-gray-50 "
        elevation={0}
        sx={{ maxWidth: "345px" }}
      >
        <StyledLink href={`/Product/${product._id}`}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={product.image}
          />
        </StyledLink>
        <CardContent>
          <p className="font-semibold mb-2 ">{product.name}</p>
          <p className="text-sm font-semibold text-grey-900  ">
            {product.description}
          </p>
          <p className="font-semibold text-lg mt-3  ">{product.price}$</p>
          <div className="flex">
            {[1, 2, 3, 4, 5, 6].map((i, x) => (
              <StarIcon key={x} className="h-7 w-7 text-gray-500  " />
            ))}
          </div>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => addItem(product)}
            className="group mb-3"
            sx={{ backgroundColor: "#334155" }}
            fullWidth
            disableElevation
            variant="contained"
            size="large"
          >
            <p className="text-white group-hover:text-white  ">ADD TO CART</p>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
