import { createContext, useContext, useState, useEffect } from "react";
const NEXT_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
import getStripe from "./payment";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const router = useRouter();
  const [MYORDER, SETMYORDER] = useState({
    myorders: [],
    myorderloading: false,
    myorderError: null,
    paymentloading: false,
    paymentError: null,
  });
  const [state, setState] = useState({
    newOrderloading: false,
    newOrderError: null,

    cart: [],
    shippingAdress: Cookies.get("shipping")
      ? JSON.parse(Cookies.get("shipping"))
      : {},
    USER: Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null,
    cart2: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
    loading: false,
    error: null,
    success: null,

    // user: Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null,
  });

  const fetchData = async () => {
    // setState({ ...state, loading: true });

    const res = await fetch("api/");
    const data = await res.json();

    if (res.ok) {
      setState({
        ...state,
        cart: data.data,
        loading: false,
      });
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // adding items into cart2

  const addItem = (product) => {
    // add qty to product
    const newproduct = { ...product, qty: 1 };
    const exist = state.cart2.some((x) => x._id == newproduct._id);
    if (!exist) {
      setState({
        ...state,
        cart2: [...state.cart2, newproduct],
      });
    }
    Cookies.set("cartItems", JSON.stringify(state.cart2));
  };

  //  remove item from cart

  const removeItem = (id) => {
    setState({
      ...state,
      cart2: state.cart2.filter((x) => x._id != id),
    });
    Cookies.set("cartItems", JSON.stringify(state.cart2));
  };

  // USER LOGIN LOGOUT REGISTER

  const registerUser = async (user) => {
    console.log(user);
    try {
      setState({ ...state, loading: true });
      const res = await fetch(`${NEXT_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        setState({ ...state, error: data, loading: false });
      } else {
        const data = await res.json();
        setState({
          ...state,
          loading: false,
          success: data,
          error: null,
          USER: data,
        });
        router.push("/");
        Cookies.set("USER", JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // login function

  const loginUser = async (user) => {
    try {
      setState({ ...state, loading: true });
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        setState({ ...state, error: data, loading: false });
      } else {
        const data = await res.json();
        console.log(data);
        setState({
          ...state,
          loading: false,
          success: data,
          error: null,
          USER: data,
        });
        router.push("/");
        Cookies.set("USER", JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // LOG OUT USER

  const logoutUser = () => {
    Cookies.remove("USER");
    setState({ ...state, USER: null });
  };

  // INCREASE PRODUCT QUINTITY IN CART
  const increaseQty = (id) => {
    const findProduct = state.cart2.find((x) => x._id == id);
    const newProduct = { ...findProduct, qty: findProduct.qty + 1 };
    const index = state.cart2.findIndex((x) => x._id == id);

    setState({
      ...state,
      cart2: [
        ...state.cart2.slice(0, index),
        newProduct,
        ...state.cart2.slice(index + 1),
      ],
    });

    Cookies.set("cartItems", JSON.stringify(state.cart2));
  };

  // DECREASE  PRODUCT QUINTITY IN CART
  const decreaseQty = (id) => {
    const findProduct = state.cart2.find((x) => x._id == id);
    const newProduct = {
      ...findProduct,
      qty: findProduct.qty > 1 ? findProduct.qty - 1 : 1,
    };
    const index = state.cart2.findIndex((x) => x._id == id);

    setState({
      ...state,
      cart2: [
        ...state.cart2.slice(0, index),
        newProduct,
        ...state.cart2.slice(index + 1),
      ],
    });

    Cookies.set("cartItems", JSON.stringify(state.cart2));
  };

  // ADD SHIPPING ADDRESS

  const addShipping = (address) => {
    setState({
      ...state,
      shippingAdress: address,
    });
    Cookies.set("shipping", JSON.stringify(address));
  };

  // CREATE ORDER FUNCTION

  const createOrder = async (order, shippingAddress, orderamount) => {
    setState({ ...state, newOrderloading: true });

    let totalProducts = order.map((x) => {
      return { name: x.name, qty: x.qty, product: x._id, price: x.price };
    });

    console.log(state.USER.token);
    const res = await fetch(`${NEXT_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.USER.token}`,
      },

      body: JSON.stringify({
        orderItems: totalProducts,
        shippingAddress: shippingAddress,
        orderamount,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error("Some Thing went wrong");
      console.log(data);
      setState({ ...state, newOrderError: data, newOrderloading: false });
    } else {
      const data = await res.json();
      toast.success("Your Order is Placed is successfully");
      console.log(data);
      setState({
        ...state,
        newOrderloading: false,
        success: data,
        cart2: [],
        shippingAdress: {},
        newOrderError: null,
      });
      Cookies.remove("cartItems");
      Cookies.remove("shipping");
      router.push("/profile");
    }
  };

  // GET ORDERS OF USER

  const getOrders = async (id) => {
    try {
      SETMYORDER({
        ...MYORDER,
        myorderloading: true,
      });
      const res = await fetch(`${NEXT_URL}/api/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.USER.token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        SETMYORDER({
          ...MYORDER,
          myorderError: data,
          myorderloading: false,
        });
      } else {
        const data = await res.json();
        console.log(data);
        SETMYORDER({
          ...MYORDER,
          myorders: data.orders,
          myorderloading: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // MAKE PAYMENT

  const makePayment = async (id) => {
    console.log(id);
    SETMYORDER({
      ...MYORDER,
      paymentloading: true,
    });

    const res = await fetch(`${NEXT_URL}/api/pay/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.USER.token}`,
      },
    });
    if (!res.ok) {
      const data = await res.json();
      toast.error("Some Thing went wrong");
      console.log(data);
      SETMYORDER({
        ...MYORDER,
        paymentError: data,
        paymentloading: false,
      });
    } else {
      const data = await res.json();
      toast.success("Your payment is one the way");
      console.log(data);
      // SETMYORDER({
      //   ...MYORDER,
      //   paymentloading: false,
      // });
      const stripe = await getStripe();

      const { error } = stripe.redirectToCheckout({ sessionId: data.id });
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        state,
        addItem,
        fetchData,
        removeItem,
        registerUser,
        loginUser,
        logoutUser,
        increaseQty,
        decreaseQty,
        addShipping,
        createOrder,
        getOrders,
        MYORDER,
        makePayment,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export async function getServerSideProps() {
  console.log("I am Great MAN hOW are You tell me ");
}
