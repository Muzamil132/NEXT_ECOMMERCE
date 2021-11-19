import React, { useContext, useEffect } from "react";
import Input2 from "../../components/Input2";
import { Container } from "@mui/material";
import Layout from "../../components/Layout";
import { StateContext } from "../../Context/StateContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Shipping = () => {
  const router = useRouter();
  const {
    state: { shippingAdress, USER, cart2 },
    addShipping,
  } = useContext(StateContext);

  console.dir(shippingAdress);
  const [state3, setState] = React.useState({
    Address: shippingAdress.Address,
    City: shippingAdress.City,
    PostalCode: shippingAdress.PostalCode,
    Country: shippingAdress.Country,
  });

  useEffect(() => {
    if (USER == null) {
      router.push("/");
    }
  }, [USER]);

  const nextStep = () => {
    if (Object.values(shippingAdress).every((x) => x === null || x === "")) {
      toast.error("Please fill all the fields");
    } else {
      router.push("/shipping/review");
    }
  };

  console.log(state3);

  const handleSubmit = (e) => {
    e.preventDefault();
    // CHECK ALL THE FIELDS ARE FILLED
    if (
      state3.Address === "" ||
      state3.City === "" ||
      state3.PostalCode === "" ||
      state3.Country === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      addShipping(state3);
      toast.success("Shipping Adress Added");
    }
  };

  return (
    <div>
      <Layout>
        <Container>
          <ToastContainer />
          <p className="font-bold text-2xl my-8">SHIPPING ADDRESS</p>
          <div className=" lg:w-1/2  ">
            <form onSubmit={handleSubmit}>
              <Input2
                placeholder="Address"
                name="Address"
                handleChange={setState}
                value={state3.Address}
                state3={state3}
              />
              <Input2
                placeholder="City"
                name="City"
                handleChange={setState}
                value={state3.City}
              />
              <Input2
                placeholder="PostalCode"
                name="PostalCode"
                handleChange={setState}
                state3={state3}
                value={state3.PostalCode}
              />
              <Input2
                placeholder="Country"
                name="Country"
                handleChange={setState}
                state3={state3}
                value={state3.Country}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSubmit}
                  class="bg-gray-700   mt-5  hover:bg-gray-500 w-full text-white font-bold py-2 lg:py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Save
                </button>
                <button
                  onClick={nextStep}
                  class="bg-blue-400   mt-5  hover:bg-blue-300 w-full text-white font-bold py-2 lg:py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </Container>
      </Layout>
    </div>
  );
};

export default Shipping;
