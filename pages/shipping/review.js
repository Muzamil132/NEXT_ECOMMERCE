import React from "react";
import Layout from "../../components/Layout";
import { StateContext } from "../../Context/StateContext";
import Redirect from "../../components/Redirect";
import { Container, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Review = () => {
  const address = ["Address", "Postalcode", "City", "Country"];

  const {
    state: { cart2, shippingAdress, newOrderloading, newOrderError },
    createOrder,
  } = React.useContext(StateContext);

  const placeOrder = () => {
    const orderamount = cart2
      .reduce((acc, curr) => acc + curr.price, 0)
      .toFixed(2);
    createOrder(cart2, shippingAdress, orderamount);
  };

  return (
    <div>
      <Redirect />
      <Layout>
        <Container className="py-5">
          <ToastContainer />
          <p className="font-bold text-2xl py-10 ">Review Details</p>
          <div className="flex flex-col  sm:flex-row">
            <div className=" flex flex-col  flex-1 order-1 sm:order-2 shadow-md px-5 py-3 rounded-lg  ">
              <p className="text-xl font-bold text-gray-900 mx-2">
                Items are their pricing
              </p>
              {cart2.map((item, index) => {
                return (
                  <div className="flex justify-between  p-3  mt-4 border-gray-400">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-600 text-sm  ">
                      Quinity:{item.qty}
                    </p>
                    <p className="text-gray-600   text-sm">
                      Price:{item.price * item.qty.toFixed(2)}
                    </p>
                  </div>
                );
              })}
              <p className="text-lg font-bold text-gray-900 mx-2">
                Total Price :{" "}
                {cart2.reduce((a, b) => a + b.price, 0).toFixed(2)}
              </p>
            </div>
            <div className="flex-1 order-2 sm:order-1 p-4 shadow-md sm:mr-4 rounded-lg">
              <p className="text-xl font-bold text-gray-900 mx-2">
                Shipping Address
              </p>
              <div>
                <Grid container>
                  <Grid item sm={4}>
                    {address.map((item, index) => {
                      return (
                        <p className="text-gray-600 text-sm font-bold mt-5">
                          {item}
                        </p>
                      );
                    })}
                  </Grid>
                  <Grid item sm={8}>
                    {Object.values(shippingAdress).map((item, index) => {
                      return (
                        <p className="text-gray-600 text-sm d mt-5">{item}</p>
                      );
                    })}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={placeOrder}
              class="bg-gray-700   mt-5  hover:bg-gray-600 w-full  lg:w-1/3 text-white font-semibold py-2 lg:py-3 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              {newOrderloading ? "LOADING..." : "Place Order"}
            </button>
          </div>
        </Container>
      </Layout>
    </div>
  );
};

export default Review;
