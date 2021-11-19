import React, { useEffect, useContext } from "react";
import Layout from "../components/Layout";
import { StateContext } from "../Context/StateContext";
import Moment from "react-moment";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Container } from "@mui/material";
const profile = () => {
  const router = useRouter();
  const {
    state: { USER, cart },
    MYORDER: { myorders },
    makePayment,

    getOrders,
  } = useContext(StateContext);
  console.log(myorders);
  useEffect(() => {
    if (USER == null) {
      router.push("/");
    }
  }, [USER]);

  useEffect(() => {
    if (USER !== null) {
      getOrders(USER.user._id);
    }
  }, [USER]);

  return (
    <div>
      <Layout>
        <ToastContainer />
        <Container>
          <div className="mt-5">
            {myorders.length > 0 ? (
              <div>
                {myorders.map((order) => (
                  <div className="flex justify-between items-center mt-3 p-3 shadow-md rounded-lg ">
                    <p className="text-sm font-semibold">
                      Total amount: {order.orderamount}
                    </p>

                    <p className="text-sm font-semibold">
                      {!order.isPaid ? "Not Paid" : "Paid"}
                    </p>
                    <button
                      onClick={() => makePayment(order._id)}
                      disabled={order.isPaid}
                      className="outline-none bg-gray-700 text-white px-7 text-semibold text-sm py-2 rounded-md "
                    >
                      {!order.isPaid ? "Pay Now" : "Paid"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>You dont have orders</p>
            )}
          </div>
        </Container>
      </Layout>
    </div>
  );
};

export default profile;
