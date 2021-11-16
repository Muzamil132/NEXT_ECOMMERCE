import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { parseCookies, setCookie, destroyCookie } from "nookies";


import { PlusIcon, MinusIcon, XIcon } from "@heroicons/react/solid";
import { Button, CardMedia, Container, Grid, IconButton } from "@mui/material";
import { StateContext } from "../Context/StateContext";
import CartCard from "../components/CartCard";

const Cart = () => {
  const { state, getData } = useContext(StateContext);

  const { cart2 } = state;
  console.log(cart2);

  return (
    <div>
      <Layout>
        <Container className="mt-10">
          <Grid container>
            {cart2.map((product, i) => (
              <CartCard key={i} product={product} />
            ))}
            <Grid item xs={12} sm={4} md={4}>
              <h1>Good</h1>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </div>
  );
};

export default Cart;

export async function getServerSideProps(ctx) {
  // Parse

  // const parsedcookies = JSON.parse(cookies)
  // console.log(parsedcookies)
  // Set

  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return {
    props: {},
  };
}
