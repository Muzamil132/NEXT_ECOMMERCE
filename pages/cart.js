import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import { PlusIcon, MinusIcon, XIcon } from "@heroicons/react/solid";
import { Button, CardMedia, Container, Grid, IconButton } from "@mui/material";
import { StateContext } from "../Context/StateContext";
import CartCard from "../components/CartCard";
import { useRouter } from "next/router";
const Cart = () => {
  const { state, getData } = useContext(StateContext);
  const router = useRouter();
  const { cart2, USER } = state;
  console.log(cart2);

  //  LETS SHOW SHOW VALUE ONLY TWO POINTS OF DECIMAL

  let tottal = cart2.reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);

  const total2 = tottal.toFixed(2);

  const goShipping = () => {
    if (USER == null) {
      router.push("/register");
    }

    router.push("/shipping");
  };

  return (
    <div>
      <Layout>
        <Container className="mt-10">
          <div className="flex flex-col  sm:flex-row  ">
            <div className="lg:w-3/4 xs:w-full order-2 sm:order-1  ">
              {cart2.map((product, i) => (
                <CartCard key={i} product={product} />
              ))}
            </div>

            <div className="lg:w-1/3 sm:w-full sm:mx-6 order-1 sm:order-2  ">
              <div className="shadow-md p-4 rounded-lg  ">
                <div className="flex space-x-4">
                  <h4>Subtotal:</h4>
                  <h4>${total2}</h4>
                </div>
                <button
                  onClick={goShipping}
                  class="bg-gray-700   mt-5  hover:bg-gray-500 w-full text-white font-bold py-2 lg:py-5 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
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
